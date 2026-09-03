import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, User } from 'lucide-react';

// ==========================================
// HEAVY & DETAILED BLOG CONTENT
// ==========================================
export const blogsData = [
  {
    id: 'zakat-on-shares-2026',
    title: "Understanding Zakat on Shares and Investments in 2026",
    excerpt: "A comprehensive guide on how to calculate Zakat on your stock market portfolio, mutual funds, and crypto assets.",
    content: `
      <p>With the rise of digital trading and investments in 2026, many Muslims are confused about how to calculate Zakat on their portfolios. The modern financial landscape is complex, but the Shariah principles governing it remain incredibly clear and practical.</p>
      
      <h3>Intention Determines the Zakat</h3>
      <p>According to modern Islamic finance rulings, the way you pay Zakat on shares depends entirely on your intention (Niyyah) when purchasing them. If you buy shares with the intention of capital gain (active trading or day trading), you are treating them as business inventory. In this case, you must pay 2.5% Zakat on their <strong>current market value</strong> on your specific Zakat anniversary date.</p>
      
      <h3>Dividend-Based Investments</h3>
      <p>However, if you bought the shares strictly for long-term dividend income and do not intend to sell the capital shares, the ruling is different. Zakat is only due on the actual dividends you have received and accumulated in your bank account, not the capital value of the shares themselves. Some scholars argue you should pay Zakat on the 'Zakatable assets' of the company, but calculating this is highly complex for the average retail investor.</p>
      
      <h3>Crypto Assets and Digital Gold</h3>
      <p>As for cryptocurrencies, the consensus among scholars who permit their trading is that they are treated as pure currency. Therefore, if your crypto wallet balance (when converted to your local currency) exceeds the Nisab threshold, a 2.5% Zakat is obligatory upon it.</p>
      
      <p><em>Always consult a qualified Mufti or a certified Islamic financial advisor for your specific portfolio, as individual circumstances may vary.</em></p>
    `,
    date: "August 15, 2026",
    author: "Mufti Bilal",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    category: "Islamic Finance"
  },
  {
    id: 'etiquette-of-sadaqah',
    title: "The Etiquette of Giving Sadaqah Secretly",
    excerpt: "Discover the spiritual benefits of hidden charity and how digital platforms like ZakatPay make it easier than ever.",
    content: `
      <p>The Prophet Muhammad (ﷺ) said that among the seven types of people who will be shaded by Allah on the Day of Judgment—a day when there will be no shade but His—is 'a person who gives charity so secretly that his left hand does not know what his right hand has given.' This profound Hadith highlights the immense spiritual value of anonymous giving.</p>
      
      <h3>The Danger of Riya (Showing Off)</h3>
      <p>In the age of social media, showing off (Riya) has become common. People often document their charitable acts online. While public charity is permitted in Islam (as it can encourage others to give), the spiritual reward is deeply compromised if the intention shifts from pleasing Allah to gaining social praise. Hidden charity protects the heart from arrogance and protects the dignity of the person receiving the help.</p>
      
      <h3>The Digital Advantage</h3>
      <p>Before the digital era, giving secretly could be physically difficult, especially in close-knit communities. Today, digital platforms like ZakatPay allow you to transfer funds directly to those in need or to verified NGOs with complete anonymity. You can donate substantial amounts to build a hospital or feed a village without anyone ever knowing your name.</p>
      
      <h3>Purifying the Soul</h3>
      <p>When you give secretly, your intention is purified. You know that no human is praising you, and only the Creator is witnessing your transaction. This creates a deeply personal and spiritual connection with Allah, elevating a simple financial transaction into an act of supreme worship.</p>
    `,
    date: "July 28, 2026",
    author: "ZakatPay Editorial",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
    category: "Spirituality"
  },
  {
    id: 'zakat-vs-tax',
    title: "Zakat vs. Tax: Clearing the Misconceptions",
    excerpt: "Why paying government taxes does not exempt you from your religious obligation of Zakat. A detailed analysis.",
    content: `
      <p>A common misconception among modern professionals is that paying income or property tax to the government fulfills one's Zakat obligation. This is fundamentally incorrect from a Shariah perspective. Understanding the difference between the two is crucial for every Muslim.</p>
      
      <h3>Different Objectives and Recipients</h3>
      <p>Taxes are civic duties designed to fund state infrastructure—roads, defense, public schools, and government salaries. You benefit directly from the taxes you pay. Zakat, on the other hand, is a divine injunction with highly specific, restricted recipients. The Quran explicitly names eight categories (Asnaf) who can receive Zakat, primarily the absolute poor, the needy, and those trapped in severe debt. You cannot use Zakat to build a public road.</p>
      
      <h3>Different Calculation Methods</h3>
      <p>Taxes are generally calculated on your income (what you earn) or your consumption (sales tax). Zakat is calculated on your stagnant wealth (what you save and hoard over a year). Zakat actively discourages the hoarding of capital, forcing it to circulate within the most vulnerable segments of society.</p>
      
      <h3>Tax Rebates in Pakistan</h3>
      <p>While you cannot deduct your standard government taxes from your Zakat liability, there is a legal benefit in Pakistan. According to the Federal Board of Revenue (FBR) Section 61, Zakat paid to approved charitable organizations can be used to claim tax rebates. This means that by fulfilling your religious duty through verified platforms like ZakatPay, you can legally lower your state income tax liability.</p>
    `,
    date: "June 10, 2026",
    author: "Dr. Ayesha Khan",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    category: "Education"
  },
  {
    id: 'zakat-for-freelancers',
    title: "Calculating Zakat for Freelancers and Remote Workers",
    excerpt: "Freelance income fluctuates. Learn how to determine your Zakat anniversary and calculate dues on irregular income.",
    content: `
      <p>Freelancers, gig economy workers, and remote contractors often do not have a fixed, predictable monthly salary. This financial irregularity makes calculating Zakat seem incredibly confusing. However, Islamic jurisprudence provides a very simple and practical method to handle fluctuating incomes.</p>
      
      <h3>The Power of the Zakat Anniversary</h3>
      <p>The easiest way to manage Zakat for irregular income is to fix one specific date in the Islamic lunar calendar. Many Muslims choose the 1st of Ramadan due to the multiplied blessings of the month. You do not need to track exactly when every single freelance invoice was paid into your account throughout the year.</p>
      
      <h3>The Calculation Method</h3>
      <p>On your chosen Zakat anniversary date, simply take a "snapshot" of your total financial standing. Calculate all your savings in your local bank, cash in hand, digital wallets (like Payoneer, Wise, or PayPal), and the current value of any gold or silver you own. Subtract any immediate pending debts or un-cleared utility bills.</p>
      
      <p>If the final total exceeds the Nisab value (usually calculated using the silver standard), you simply pay exactly 2.5% on that total amount. This single-day evaluation method, endorsed by the majority of contemporary scholars, completely removes the headache of tracking daily income fluctuations.</p>
    `,
    date: "May 22, 2026",
    author: "Ahmad Nadeem",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    category: "Modern Work"
  },
  {
    id: 'gold-silver-nisab',
    title: "Zakat on Gold and Silver: A Complete Guide",
    excerpt: "Do you pay Zakat on jewelry you wear daily? We break down the Hanafi and Shafii perspectives.",
    content: `
      <p>Zakat on gold and silver is one of the most frequently asked, and heavily debated, topics among Muslim households. The confusion usually stems from the different rulings across various Islamic schools of thought regarding jewelry that is used for personal wear.</p>
      
      <h3>The Hanafi Perspective</h3>
      <p>According to the Hanafi school of thought, Zakat is obligatory on all gold and silver jewelry, regardless of its use. Whether the jewelry is worn daily, kept in a locker for special occasions, or hoarded for financial emergencies, it is subject to Zakat. As long as the total weight reaches the Nisab (87.48 grams or 7.5 Tolas for gold), you must pay 2.5% of its total value.</p>
      
      <h3>The Shafii, Maliki, and Hanbali Perspective</h3>
      <p>The majority of scholars from these three schools take a different approach. They rule that gold and silver jewelry purchased purely for reasonable personal use and adornment by women is exempt from Zakat. However, if the jewelry is bought with the primary intention of storing wealth or treating it as a financial asset, Zakat becomes obligatory.</p>
      
      <h3>How to Value Your Gold</h3>
      <p>When calculating Zakat, you must calculate its <strong>current market selling value</strong>, not the purchasing price or the making charges. If you were to sell that gold in the market today, the cash you would receive is the value you calculate your 2.5% upon. It is highly recommended to take your jewelry to a trusted jeweler once a year to get its exact current valuation before paying Zakat.</p>
    `,
    date: "April 05, 2026",
    author: "Mufti Bilal",
    image: "https://images.unsplash.com/photo-1629253886516-34473efbd8c4?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // <-- WORKING LINK FIXED HERE
    category: "Islamic Finance"
  },
  {
    id: 'empowering-underprivileged',
    title: "How Zakat Empowers the Underprivileged",
    excerpt: "Zakat is more than charity; it is an economic tool designed to eradicate poverty and circulate wealth.",
    content: `
      <p>When we look at Zakat simply as "giving money to the poor," we miss the profound macroeconomic brilliance of the Islamic economic system. Zakat is not merely a band-aid for poverty; it is a structural mechanism designed to completely eradicate it by ensuring wealth does not pool exclusively in the hands of the rich.</p>
      
      <h3>The Circulation of Capital</h3>
      <p>Islam strictly discourages the hoarding of stagnant wealth. By enforcing a 2.5% annual tax on static capital, Zakat forces money to flow back into the economy. This money goes directly into the hands of the most underprivileged—the Fuqara and Masakin—who have a high marginal propensity to consume. They don't save the Zakat; they spend it immediately on food, medicine, and shelter.</p>
      
      <h3>Creating Economic Demand</h3>
      <p>This immediate spending creates a surge in demand for basic goods within the local economy. Increased demand requires more production, which in turn creates jobs. In this way, Zakat acts as a powerful economic stimulant from the ground up.</p>
      
      <h3>Long-Term Empowerment</h3>
      <p>Modern charitable foundations use Zakat not just for feeding people, but for empowerment. By using platforms like ZakatPay to route your Zakat to micro-finance initiatives (like Akhuwat) or education funds (like TCF), you are helping families break the generational cycle of poverty. Providing a laborer with a rickshaw or funding an orphan's engineering degree ensures that the receiver of Zakat today becomes the giver of Zakat tomorrow.</p>
    `,
    date: "March 18, 2026",
    author: "ZakatPay Editorial",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    category: "Social Impact"
  }
];

export default function Blogs() {
  return (
    <div className="w-full pb-24 framer-animate">
      <div className="bg-white/5 border-b border-white/10 py-16 text-center">
        <BookOpen className="text-pink-500 mx-auto mb-4" size={40} />
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Islamic <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Blogs & Articles</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto px-4">Deepen your knowledge about Islamic finance, Zakat rulings, and the impact of your charity.</p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogsData.map((blog) => (
          <div key={blog.id} className="bg-[#0a0a0c] border border-white/10 rounded-3xl overflow-hidden hover:border-pink-500/50 transition-colors group flex flex-col">
            <div className="h-48 overflow-hidden relative flex-shrink-0 bg-white/5">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-pink-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                {blog.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">
                <span className="flex items-center gap-1"><Calendar size={12}/> {blog.date}</span>
                <span className="flex items-center gap-1"><User size={12}/> {blog.author}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">{blog.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">{blog.excerpt}</p>
              
              <Link to={`/blog/${blog.id}`} className="mt-auto text-pink-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-pink-300 transition-colors w-fit">
                Read Article <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}