'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isDark] = useState(true)
  const [prices, setPrices] = useState({
    BTC: 43521.00,
    ETH: 2284.50,
    BNB: 312.45,
    SOL: 98.32,
    XRP: 0.5234,
    ADA: 0.4521,
    DOGE: 0.0821,
    MATIC: 0.8234
  })
  const [payAmount, setPayAmount] = useState('1000')
  const [payCurrency, setPayCurrency] = useState('USD')
  const [getCurrency, setGetCurrency] = useState('BTC')

  // Update prices in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => {
        const updated = { ...prev }
        Object.keys(updated).forEach(key => {
          const change = (Math.random() - 0.5) * (updated[key] * 0.02)
          updated[key] = Math.max(0.0001, updated[key] + change)
        })
        return updated
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const calculateCrypto = () => {
    const amount = parseFloat(payAmount) || 0
    const price = prices[getCurrency] || 1
    return (amount / price).toFixed(8)
  }

  const fee = (parseFloat(payAmount) || 0) * 0.001
  const total = (parseFloat(payAmount) || 0) + fee
  const cryptoAmount = calculateCrypto()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f14] via-[#111a22] to-[#0a0f14] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#137fec]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#137fec]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#137fec]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      {/* Header */}
      <header className="border-b border-[#233648]/50 backdrop-blur-sm bg-[#111a22]/80 sticky top-0 z-50 px-4 sm:px-6 md:px-10 lg:px-40 py-3 sm:py-4 transition-all duration-300">
        <div className="max-w-[960px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 text-white">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#137fec]" fill="currentColor" viewBox="0 0 48 48">
              <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" />
            </svg>
            <h2 className="text-base sm:text-lg font-bold">Crypto Broker</h2>
          </div>
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a href="#features" className="text-white text-sm font-medium hover:text-[#137fec] transition-colors">Features</a>
            <a href="#how-it-works" className="text-white text-sm font-medium hover:text-[#137fec] transition-colors">How it Works</a>
            <a href="#testimonials" className="text-white text-sm font-medium hover:text-[#137fec] transition-colors">Testimonials</a>
            <button className="px-4 h-10 bg-[#137fec] text-white text-sm font-bold rounded-lg hover:bg-[#1068c4] hover:shadow-lg hover:shadow-[#137fec]/50 transition-all">Sign Up</button>
            <button className="px-4 h-10 bg-[#233648] text-white text-sm font-bold rounded-lg hover:bg-[#2d4558] transition-all">Log In</button>
          </nav>
          <div className="flex lg:hidden gap-2">
            <button className="px-3 h-9 bg-[#137fec] text-white text-xs font-bold rounded-lg">Sign Up</button>
            <button className="px-3 h-9 bg-[#233648] text-white text-xs font-bold rounded-lg">Log In</button>
          </div>
        </div>
      </header>

      {/* Live Price Ticker */}
      <div className="bg-[#0d1419] border-b border-[#233648]/30 py-3 overflow-hidden relative">
        <div className="flex animate-scroll-seamless whitespace-nowrap">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-8 px-4 flex-shrink-0">
              {Object.entries(prices).map(([name, price], i) => {
                const change = ((Math.random() - 0.5) * 5).toFixed(2)
                const positive = parseFloat(change) > 0
                return (
                  <div key={`${idx}-${i}`} className="flex items-center gap-3 px-4 flex-shrink-0">
                    <span className="text-white font-bold text-sm">{name}</span>
                    <span className="text-[#92adc9] text-sm">${price.toFixed(name === 'BTC' || name === 'ETH' ? 2 : 4)}</span>
                    <span className={`text-xs font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}>
                      {positive ? '↑' : '↓'} {Math.abs(parseFloat(change)).toFixed(2)}%
                    </span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-40 py-8 sm:py-12 md:py-16 relative">
        <div className="max-w-[960px] mx-auto fade-up">
          <div className="min-h-[400px] sm:min-h-[480px] md:min-h-[520px] flex flex-col items-center justify-center text-center gap-6 sm:gap-8 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 bg-cover bg-center relative overflow-hidden" style={{backgroundImage: "linear-gradient(rgba(17, 26, 34, 0.85) 0%, rgba(17, 26, 34, 0.95) 100%), url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80')"}}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#137fec]/10 via-transparent to-[#137fec]/10"></div>
            <div className="relative z-10 space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight px-4">The Future of Crypto Trading is Here</h1>
              <p className="text-[#92adc9] text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed px-4">Trade with confidence on our secure, low-fee platform. Access a wide range of assets and enjoy a seamless trading experience.</p>
            </div>
            <button className="relative z-10 px-6 sm:px-8 h-12 sm:h-14 bg-gradient-to-r from-[#137fec] to-[#0d5fb8] text-white text-sm sm:text-base font-bold rounded-lg hover:shadow-2xl hover:shadow-[#137fec]/50 hover:scale-105 transition-all duration-300">Get Started</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 md:px-10 lg:px-40 py-10 sm:py-12 md:py-14 relative overflow-hidden">
        {/* Background Dashboard Image */}
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80" 
            alt="Crypto Trading Dashboard" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-[960px] mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-10 fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight px-4">Key Benefits</h2>
            <p className="text-[#92adc9] text-base sm:text-lg px-4">Discover the advantages of trading with our platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-[#192633] to-[#0f1a24] border border-[#324d67] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:border-[#137fec]/50 hover:shadow-xl hover:shadow-[#137fec]/20 hover:-translate-y-2 transition-all duration-300 group fade-up">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#137fec] to-[#0d5fb8] text-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3">Secure Trading</h3>
              <p className="text-[#92adc9] text-sm leading-relaxed">Your assets are protected with our state-of-the-art security measures.</p>
            </div>
            <div className="bg-gradient-to-br from-[#192633] to-[#0f1a24] border border-[#324d67] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:border-[#137fec]/50 hover:shadow-xl hover:shadow-[#137fec]/20 hover:-translate-y-2 transition-all duration-300 group fade-up" style={{animationDelay: '0.1s'}}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#137fec] to-[#0d5fb8] text-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3">Low Fees</h3>
              <p className="text-[#92adc9] text-sm leading-relaxed">Enjoy competitive and transparent fee structures.</p>
            </div>
            <div className="bg-gradient-to-br from-[#192633] to-[#0f1a24] border border-[#324d67] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:border-[#137fec]/50 hover:shadow-xl hover:shadow-[#137fec]/20 hover:-translate-y-2 transition-all duration-300 group fade-up sm:col-span-2 lg:col-span-1" style={{animationDelay: '0.2s'}}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#137fec] to-[#0d5fb8] text-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3">Wide Asset Selection</h3>
              <p className="text-[#92adc9] text-sm leading-relaxed">Access a diverse range of cryptocurrencies and digital assets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-40 py-8 sm:py-10 md:py-12">
        <div className="max-w-[960px] mx-auto">
          <div className="bg-gradient-to-br from-[#192633] to-[#0f1a24] border border-[#324d67] rounded-2xl p-8 sm:p-12 fade-up">
            <h3 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">Trusted & Secure Platform</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'SSL Secured' },
                { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: '2FA Protected' },
                { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', label: 'Cold Storage' },
                { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Regulated' },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 bg-[#137fec]/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#137fec]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} /></svg>
                  </div>
                  <span className="text-white text-sm font-semibold">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trading Stats Dashboard */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-40 py-8 sm:py-10 md:py-12 relative">
        <div className="max-w-[960px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: '24h Volume', value: '$2.4B', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
              { label: 'Active Traders', value: '150K+', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { label: 'Total Trades', value: '5.2M', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { label: 'Assets Listed', value: '200+', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-[#192633] to-[#0f1a24] border border-[#324d67] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-[#137fec]/50 transition-all duration-300 fade-up" style={{animationDelay: `${i * 0.1}s`}}>
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#137fec] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} /></svg>
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-[#92adc9]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 sm:px-6 md:px-10 lg:px-40 py-10 sm:py-12 md:py-14 bg-[#0d1419]/50 relative">
        {/* Decorative Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#137fec]/50 to-transparent"></div>
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-8 sm:mb-10 fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight px-4">How It Works</h2>
            <p className="text-[#92adc9] text-base sm:text-lg px-4">Getting started is simple. Follow these four easy steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', title: 'Sign Up', desc: 'Create your account in just a few minutes.' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Verify Identity', desc: 'Complete our secure identity verification process.' },
              { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'Deposit Funds', desc: 'Add funds to your account to start trading.' },
              { icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z', title: 'Start Trading', desc: "You're all set! Begin your crypto trading journey." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 sm:gap-4 group fade-up" style={{animationDelay: `${i * 0.1}s`}}>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#137fec] to-[#0d5fb8] text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-[#137fec]/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#137fec]/50 transition-all duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} /></svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#0d5fb8] to-[#137fec] text-white text-sm font-bold rounded-full flex items-center justify-center border-2 border-[#0d1419] shadow-lg">{i + 1}</div>
                </div>
                <div>
                  <h3 className="text-white text-lg sm:text-xl font-bold mb-1 sm:mb-2">{step.title}</h3>
                  <p className="text-[#92adc9] text-sm leading-relaxed px-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crypto Price Chart Preview */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-40 py-10 sm:py-12 md:py-14">
        <div className="max-w-[960px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="fade-up">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Real-Time Market Data</h2>
              <p className="text-[#92adc9] text-base sm:text-lg mb-6 leading-relaxed">Track live prices, analyze trends, and make informed trading decisions with our advanced charting tools.</p>
              <ul className="space-y-3">
                {['Live price updates', 'Advanced technical indicators', 'Multiple timeframes', 'Customizable charts'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#192633] to-[#0f1a24] border border-[#324d67] rounded-2xl p-6 fade-up" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[#92adc9] text-sm">BTC/USD</div>
                  <div className="text-white text-2xl font-bold">${prices.BTC.toFixed(2)}</div>
                  <div className="text-green-400 text-sm">+{((Math.random() * 5)).toFixed(2)}% (24h)</div>
                </div>
                <div className="flex gap-2">
                  {['1H', '1D', '1W', '1M'].map((t, i) => (
                    <button key={i} className={`px-3 py-1 rounded text-xs font-semibold ${i === 1 ? 'bg-[#137fec] text-white' : 'bg-[#233648] text-[#92adc9]'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="h-48 flex items-end justify-between gap-1">
                {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 100, 92, 85, 95, 90, 100, 95, 88, 92].map((height, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-[#137fec] to-[#137fec]/30 rounded-t hover:from-[#1068c4] transition-all" style={{height: `${height}%`}}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-4 sm:px-6 md:px-10 lg:px-40 py-10 sm:py-12 md:py-14 pb-6 sm:pb-8 relative">
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-8 sm:mb-10 fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight px-4">What Our Users Say</h2>
            <p className="text-[#92adc9] text-base sm:text-lg px-4">Hear from our satisfied customers who are already trading with us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: 'Alice J.', role: 'Crypto Enthusiast', text: "An incredibly user-friendly platform with top-notch security. I've been trading here for over a year, and I've never had any issues. Highly recommended for both beginners and experienced traders." },
              { name: 'Bob K.', role: 'Day Trader', text: "The low fees are a game-changer. I've saved a lot on transaction costs, which has significantly boosted my profits. The wide range of assets is a big plus too." },
              { name: 'Carol L.', role: 'Long-term Investor', text: 'I love the seamless trading experience. The platform is fast, reliable, and easy to navigate. The customer support team is also very responsive and helpful.' }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-[#192633] to-[#0f1a24] border border-[#324d67] rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-[#137fec]/50 hover:shadow-xl hover:shadow-[#137fec]/20 transition-all duration-300 fade-up md:last:col-span-2 lg:last:col-span-1" style={{animationDelay: `${i * 0.1}s`}}>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#137fec] to-[#0d5fb8] rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg flex-shrink-0">{testimonial.name[0]}</div>
                  <div>
                    <p className="text-white font-bold text-base sm:text-lg">{testimonial.name}</p>
                    <p className="text-[#137fec] text-xs sm:text-sm font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[#92adc9] text-sm sm:text-base leading-relaxed">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-40 py-10 sm:py-12 md:py-14 pb-6 sm:pb-8 relative overflow-hidden">
        {/* Background Dashboard Image */}
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80" 
            alt="Trading Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-[960px] mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-10 fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight px-4">Why Choose Us</h2>
            <p className="text-[#92adc9] text-base sm:text-lg px-4">See how we compare to other platforms</p>
          </div>
          <div className="overflow-x-auto fade-up" style={{animationDelay: '0.2s'}}>
            <table className="w-full bg-gradient-to-br from-[#192633] to-[#0f1a24] border border-[#324d67] rounded-2xl overflow-hidden">
              <thead>
                <tr className="border-b border-[#324d67]">
                  <th className="text-left p-4 sm:p-6 text-white font-bold text-sm sm:text-base">Feature</th>
                  <th className="text-center p-4 sm:p-6">
                    <div className="text-[#137fec] font-black text-base sm:text-lg">Crypto Broker</div>
                  </th>
                  <th className="text-center p-4 sm:p-6 text-[#92adc9] font-semibold text-sm sm:text-base">Others</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Trading Fees', us: '0.1%', others: '0.5%+' },
                  { feature: 'Withdrawal Time', us: 'Instant', others: '1-3 days' },
                  { feature: '24/7 Support', us: true, others: false },
                  { feature: 'Advanced Charts', us: true, others: true },
                  { feature: 'Mobile App', us: true, others: true },
                  { feature: 'Cold Storage', us: true, others: false },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#324d67]/50 last:border-0">
                    <td className="p-4 sm:p-6 text-white text-sm sm:text-base">{row.feature}</td>
                    <td className="p-4 sm:p-6 text-center">
                      {typeof row.us === 'boolean' ? (
                        row.us ? <svg className="w-6 h-6 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      ) : <span className="text-[#137fec] font-bold text-sm sm:text-base">{row.us}</span>}
                    </td>
                    <td className="p-4 sm:p-6 text-center">
                      {typeof row.others === 'boolean' ? (
                        row.others ? <svg className="w-6 h-6 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      ) : <span className="text-[#92adc9] text-sm sm:text-base">{row.others}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Live Activity Feed & Calculator */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-40 py-10 sm:py-12 md:py-14 pb-6 sm:pb-8 bg-[#0d1419]/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#137fec]/50 to-transparent"></div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" 
            alt="Crypto Pattern" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-[960px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Live Activity Feed */}
            <div className="bg-gradient-to-br from-[#192633] to-[#0f1a24] border border-[#324d67] rounded-2xl p-6 sm:p-8 fade-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-white">Live Trades</h3>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-3">
                {[
                  { user: 'User****21', action: 'bought', amount: '0.5 BTC', time: '2s ago', positive: true },
                  { user: 'User****89', action: 'sold', amount: '2.3 ETH', time: '5s ago', positive: false },
                  { user: 'User****45', action: 'bought', amount: '100 SOL', time: '8s ago', positive: true },
                  { user: 'User****67', action: 'bought', amount: '5000 XRP', time: '12s ago', positive: true },
                  { user: 'User****33', action: 'sold', amount: '1.2 BTC', time: '15s ago', positive: false },
                ].map((trade, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#0d1419]/50 rounded-lg hover:bg-[#0d1419] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${trade.positive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <div>
                        <div className="text-white text-sm font-semibold">{trade.user}</div>
                        <div className="text-[#92adc9] text-xs">{trade.action} {trade.amount}</div>
                      </div>
                    </div>
                    <div className="text-[#92adc9] text-xs">{trade.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculator */}
            <div className="bg-gradient-to-br from-[#192633] to-[#0f1a24] border border-[#324d67] rounded-2xl p-6 sm:p-8 fade-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-6">Quick Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[#92adc9] text-sm mb-2 block">You Pay</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      placeholder="1000" 
                      className="flex-1 bg-[#0d1419] border border-[#324d67] rounded-lg px-4 py-3 text-white focus:border-[#137fec] focus:outline-none" 
                    />
                    <select 
                      value={payCurrency}
                      onChange={(e) => setPayCurrency(e.target.value)}
                      className="bg-[#0d1419] border border-[#324d67] rounded-lg px-4 py-3 text-white focus:border-[#137fec] focus:outline-none"
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button 
                    onClick={() => {
                      const temp = getCurrency
                      setGetCurrency(payCurrency === 'USD' ? 'BTC' : payCurrency)
                      setPayCurrency(temp)
                    }}
                    className="w-10 h-10 bg-[#137fec] rounded-full flex items-center justify-center hover:bg-[#1068c4] transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  </button>
                </div>
                <div>
                  <label className="text-[#92adc9] text-sm mb-2 block">You Get</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={cryptoAmount}
                      readOnly
                      placeholder="0.023" 
                      className="flex-1 bg-[#0d1419] border border-[#324d67] rounded-lg px-4 py-3 text-white focus:border-[#137fec] focus:outline-none" 
                    />
                    <select 
                      value={getCurrency}
                      onChange={(e) => setGetCurrency(e.target.value)}
                      className="bg-[#0d1419] border border-[#324d67] rounded-lg px-4 py-3 text-white focus:border-[#137fec] focus:outline-none"
                    >
                      <option>BTC</option>
                      <option>ETH</option>
                      <option>SOL</option>
                      <option>BNB</option>
                      <option>XRP</option>
                    </select>
                  </div>
                </div>
                <div className="bg-[#0d1419]/50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between text-[#92adc9]">
                    <span>Fee (0.1%)</span>
                    <span>${fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="bg-[#137fec]/10 border border-[#137fec]/30 rounded-lg p-3 text-center">
                  <div className="text-[#92adc9] text-xs mb-1">Current Rate</div>
                  <div className="text-white font-bold">1 {getCurrency} = ${prices[getCurrency]?.toFixed(2) || '0.00'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-40 py-10 sm:py-12 md:py-14 bg-[#0d1419]/50 relative">
        {/* Decorative Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#137fec]/50 to-transparent"></div>
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-8 sm:mb-10 fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight px-4">Frequently Asked Questions</h2>
            <p className="text-[#92adc9] text-base sm:text-lg px-4">Find answers to common questions about our platform, security, fees, and trading.</p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {[
              { q: 'What is Crypto Broker?', a: 'Crypto Broker is a digital asset platform that allows users to buy, sell, and trade a wide variety of cryptocurrencies. We provide a secure and user-friendly environment for both new and experienced traders.' },
              { q: 'How do you ensure the security of my assets?', a: 'We employ a multi-layered security strategy, including cold storage for the majority of digital assets, two-factor authentication (2FA), and regular security audits to ensure the safety of your funds and data.' },
              { q: 'What are the fees for trading?', a: "We offer a competitive tiered fee structure based on your trading volume. Our fees are transparent and among the lowest in the industry. You can find a detailed fee schedule on our 'Fees' page." },
              { q: 'Which cryptocurrencies can I trade?', a: 'We support a wide range of cryptocurrencies, including majors like Bitcoin (BTC) and Ethereum (ETH), as well as a variety of altcoins. We are continuously adding new assets to our platform.' }
            ].map((faq, i) => (
              <details key={i} className="bg-gradient-to-br from-[#192633] to-[#0f1a24] border border-[#324d67] rounded-xl sm:rounded-2xl p-4 sm:p-6 group hover:border-[#137fec]/50 transition-all duration-300 fade-up" style={{animationDelay: `${i * 0.05}s`}}>
                <summary className="flex items-center justify-between cursor-pointer gap-4">
                  <h3 className="text-white font-bold text-sm sm:text-base md:text-lg">{faq.q}</h3>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-[#92adc9] text-sm sm:text-base mt-3 sm:mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-6 sm:mt-8 py-8 sm:py-10">
        {/* Full Width Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#233648] to-transparent"></div>
        <div className="px-4 sm:px-6 md:px-10 lg:px-40">
        <div className="max-w-[960px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Crypto Broker</h3>
            <p className="text-[#92adc9] text-xs sm:text-sm">The future of crypto trading.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Sitemap</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-[#92adc9] hover:text-[#137fec] text-xs sm:text-sm transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-[#92adc9] hover:text-[#137fec] text-xs sm:text-sm transition-colors">How it Works</a></li>
              <li><a href="#testimonials" className="text-[#92adc9] hover:text-[#137fec] text-xs sm:text-sm transition-colors">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-2 text-[#92adc9] text-xs sm:text-sm">
              <li><a href="mailto:support@cryptobroker.com" className="hover:text-[#137fec] transition-colors break-all">support@cryptobroker.com</a></li>
              <li>123 Crypto Lane, Blockchain City</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
            <div className="flex gap-3 sm:gap-4 text-[#92adc9] text-xs sm:text-sm">
              <a href="#" className="hover:text-[#137fec] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[#137fec] transition-colors">GitHub</a>
            </div>
          </div>
        </div>
        </div>
        <div className="px-4 sm:px-6 md:px-10 lg:px-40">
          <div className="text-center text-[#92adc9] text-xs sm:text-sm mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#233648]/50">© 2024 Crypto Broker. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
