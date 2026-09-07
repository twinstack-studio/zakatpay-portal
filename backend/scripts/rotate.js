/**
 * Interactive helper for rotating the credentials in .env.
 *
 * Run it with:  npm run rotate
 *
 * The values you type stay on this machine - they are written straight into
 * .env, which is gitignored. Nothing is printed back to the screen and nothing
 * is sent anywhere.
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ENV_PATH = path.join(__dirname, '..', '.env');

function ask(question, hidden = false) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    if (hidden) {
      // Print asterisks instead of the characters being typed.
      const onData = (char) => {
        if (['\n', '\r', ''].includes(char.toString())) return;
        readline.moveCursor(process.stdout, -1000, 0);
        readline.clearLine(process.stdout, 1);
        process.stdout.write(question + '*'.repeat(rl.line.length));
      };
      process.stdin.on('data', onData);
      rl.question(question, (answer) => {
        process.stdin.removeListener('data', onData);
        process.stdout.write('\n');
        rl.close();
        resolve(answer.trim());
      });
    } else {
      rl.question(question, (answer) => { rl.close(); resolve(answer.trim()); });
    }
  });
}

function readEnv() {
  return fs.readFileSync(ENV_PATH, 'utf8');
}

function writeKey(env, key, value) {
  const line = `${key}=${value}`;
  return new RegExp(`^${key}=.*$`, 'm').test(env)
    ? env.replace(new RegExp(`^${key}=.*$`, 'm'), line)
    : env.trimEnd() + '\n' + line + '\n';
}

async function setMongoPassword() {
  let env = readEnv();
  const current = env.match(/^MONGO_URI=(.*)$/m);
  if (!current) return console.log('MONGO_URI not found in .env');

  const parts = current[1].match(/^(mongodb\+srv:\/\/)([^:]+):([^@]+)@(.+)$/);
  if (!parts) return console.log('Could not parse MONGO_URI - edit .env by hand.');

  console.log(`\n  Database user : ${parts[2]}`);
  console.log(`  Cluster       : ${parts[4].split('/')[0]}\n`);

  const pw = await ask('  Paste the NEW database password: ', true);
  if (!pw) return console.log('  Nothing entered - no change made.');

  // A password can contain @ : / ? # & % which would break the URI, so it has
  // to be percent-encoded inside the connection string.
  const uri = `${parts[1]}${parts[2]}:${encodeURIComponent(pw)}@${parts[4]}`;
  fs.writeFileSync(ENV_PATH, writeKey(env, 'MONGO_URI', uri));
  console.log('  MONGO_URI updated.\n');
}

async function setEmailPassword() {
  let env = readEnv();
  const user = (env.match(/^EMAIL_USER=(.*)$/m) || [])[1] || '(not set)';
  console.log(`\n  Gmail account : ${user}\n`);

  let pw = await ask('  Paste the NEW 16-character App Password: ', true);
  pw = pw.replace(/\s+/g, ''); // Google shows it as "abcd efgh ijkl mnop"
  if (!pw) return console.log('  Nothing entered - no change made.');
  if (pw.length !== 16) {
    console.log(`  Warning: expected 16 characters, got ${pw.length}. Saving anyway.`);
  }
  fs.writeFileSync(ENV_PATH, writeKey(readEnv(), 'EMAIL_PASS', pw));
  console.log('  EMAIL_PASS updated.\n');
}

async function verify() {
  console.log('\n  Checking the new credentials...\n');
  delete require.cache[require.resolve('dotenv')];
  require('dotenv').config({ path: ENV_PATH, override: true, quiet: true });

  const mongoose = require('mongoose');
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 12000 });
    const users = await mongoose.connection.db.collection('users').countDocuments();
    console.log(`  ✅ Database connected (${users} accounts found)`);
    await mongoose.disconnect();
  } catch (err) {
    console.log(`  ❌ Database FAILED: ${err.message}`);
  }

  const nodemailer = require('nodemailer');
  const t = nodemailer.createTransport({
    host: 'smtp.gmail.com', port: 465, secure: true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  try {
    await t.verify();
    console.log('  ✅ Email login works');
  } catch (err) {
    console.log(`  ❌ Email FAILED: ${err.message}`);
  }
  t.close();
}

(async () => {
  console.log('\n=== ZakatPay credential rotation ===');
  console.log('Nothing you type is displayed or sent anywhere.\n');
  console.log('  1) Database password');
  console.log('  2) Gmail App Password');
  console.log('  3) Both');
  console.log('  4) Just check the current ones\n');

  const choice = await ask('Choose 1-4: ');
  if (choice === '1' || choice === '3') await setMongoPassword();
  if (choice === '2' || choice === '3') await setEmailPassword();
  await verify();

  console.log('\nDone. Restart the backend so it picks up the new values.\n');
  process.exit(0);
})();
