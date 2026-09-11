import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Bell, CheckCircle2, ChevronRight, CloudSun, HandCoins,
  Leaf, Menu, MessageCircle, PackageCheck, Search, ShoppingCart,
  Sprout, Store, Tractor, TrendingUp, Truck, UserRound, X
} from "lucide-react";
import "./styles.css";

const products = [
  { id: 1, name: "Organic Tomatoes", farmer: "Ramesh Kumar", category: "Vegetables", price: 40, market: 60, unit: "kg", rating: 4.9, stock: "320 kg", image: "https://images.unsplash.com/photo-1546470427-e5ac89cd0b04?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Farm Potatoes", farmer: "Suresh Patel", category: "Vegetables", price: 30, market: 45, unit: "kg", rating: 4.8, stock: "500 kg", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Premium Wheat", farmer: "Priya Singh", category: "Grains", price: 55, market: 70, unit: "kg", rating: 4.7, stock: "1,200 kg", image: "https://images.unsplash.com/photo-1502741126161-b048400dca80?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Fresh Green Peas", farmer: "Amit Verma", category: "Vegetables", price: 58, market: 75, unit: "kg", rating: 4.8, stock: "180 kg", image: "https://images.unsplash.com/photo-1538171624506-8f1a8fc6b5f1?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Basmati Rice", farmer: "Neha Yadav", category: "Grains", price: 72, market: 92, unit: "kg", rating: 4.9, stock: "850 kg", image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Fresh Spinach", farmer: "Manoj Sharma", category: "Leafy Greens", price: 28, market: 40, unit: "kg", rating: 4.6, stock: "95 kg", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=85" }
];

const starterOrders = [
  { id: "#FC-1023", item: "Organic Tomatoes", qty: "20 kg", buyer: "FreshBasket", status: "Pending", amount: "₹800" },
  { id: "#FC-1024", item: "Premium Wheat", qty: "50 kg", buyer: "City Grocers", status: "Shipped", amount: "₹2,750" },
  { id: "#FC-1025", item: "Farm Potatoes", qty: "30 kg", buyer: "DailyMart", status: "Delivered", amount: "₹900" }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [role, setRole] = useState("Buyer");
  const [orders, setOrders] = useState(starterOrders);
  const [toast, setToast] = useState("");
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([
    { name: "Ramesh Kumar", text: "Anyone facing pest issues in tomato farming? Looking for organic solutions.", likes: 12 },
    { name: "Priya Singh", text: "What are the best irrigation methods during the summer season?", likes: 8 }
  ]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch = !q || `${p.name} ${p.farmer} ${p.category}`.toLowerCase().includes(q);
      const matchesCategory = category === "All" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 2400);
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...current, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart`);
  }

  function changeQty(id, delta) {
    setCart((current) =>
      current
        .map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
        .filter((item) => item.qty > 0)
    );
  }

  function cycleOrder(id) {
    const flow = ["Pending", "Packed", "Shipped", "Delivered"];
    setOrders((current) => current.map((order) => {
      if (order.id !== id) return order;
      const next = flow[(flow.indexOf(order.status) + 1) % flow.length];
      return { ...order, status: next };
    }));
  }

  function publishPost() {
    const text = postText.trim();
    if (!text) return showToast("Write something before posting");
    setPosts((current) => [{ name: "You", text, likes: 0 }, ...current]);
    setPostText("");
    showToast("Post published");
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark"><Leaf size={20} /></span>
            <span>Farm<span>Link</span></span>
          </a>

          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
            {["home", "marketplace", "dashboard", "orders", "prices", "community"].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>
                {item[0].toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="icon-btn" title="Notifications"><Bell size={18} /></button>
            <button className="cart-btn" onClick={() => document.getElementById("cart-panel")?.classList.add("show")}>
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cart.length > 0 && <b>{cart.length}</b>}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><SparkLeaf /> Direct farm-to-buyer marketplace</div>
            <h1>Better prices for farmers. <span>Fresher produce for buyers.</span></h1>
            <p>List produce, discover trusted farmers, compare market prices, and connect directly — without unnecessary middlemen.</p>
            <div className="hero-actions">
              <a href="#marketplace" className="primary-btn">Explore Marketplace <ArrowRight size={18} /></a>
              <button className="secondary-btn" onClick={() => setRole(role === "Buyer" ? "Farmer" : "Buyer")}>
                Switch to {role === "Buyer" ? "Farmer" : "Buyer"} View
              </button>
            </div>
            <div className="hero-proof">
              <div><strong>₹</strong><span>Fairer pricing</span></div>
              <div><strong><CheckCircle2 size={20}/></strong><span>Trusted profiles</span></div>
              <div><strong><Truck size={20}/></strong><span>Direct delivery</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-card">
              <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1100&q=85" alt="Agricultural field" />
              <div className="hero-overlay">
                <span className="live-dot"></span> Marketplace is active
                <strong>Connect directly. Trade transparently.</strong>
              </div>
            </div>
            <div className="floating-card price-float">
              <TrendingUp size={18}/>
              <div><span>Farmer price</span><strong>₹40/kg</strong></div>
              <small>Market ₹60</small>
            </div>
            <div className="floating-card trust-float">
              <CheckCircle2 size={18}/>
              <div><span>Verified farmer</span><strong>Ramesh Kumar</strong></div>
              <small>4.9 ★</small>
            </div>
          </div>
        </section>

        <section className="stats-strip">
          {[
            ["500+", "Registered farmers", Tractor],
            ["10K+", "Active buyers", UserRound],
            ["20+", "States & regions", Store],
            ["50K+", "Orders supported", PackageCheck]
          ].map(([value, label, Icon]) => (
            <div className="stat-item" key={label}>
              <div className="stat-icon"><Icon size={20}/></div>
              <div><strong>{value}</strong><span>{label}</span></div>
            </div>
          ))}
        </section>

        <section className="section" id="marketplace">
          <div className="section-heading">
            <div>
              <span className="kicker">Marketplace</span>
              <h2>Shop directly from farmers</h2>
              <p>Transparent pricing, available stock and trusted farmer profiles in one place.</p>
            </div>
            <div className="role-pill">
              <button className={role === "Buyer" ? "active" : ""} onClick={() => setRole("Buyer")}>Buyer</button>
              <button className={role === "Farmer" ? "active" : ""} onClick={() => setRole("Farmer")}>Farmer</button>
            </div>
          </div>

          <div className="market-toolbar">
            <label className="search-box"><Search size={18}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search produce, farmer, or category..." /></label>
            <div className="chip-row">
              {["All", "Vegetables", "Grains", "Leafy Greens"].map((c) => (
                <button key={c} className={category === c ? "chip active" : "chip"} onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="verified-badge"><CheckCircle2 size={14}/> Verified farmer</span>
                </div>
                <div className="product-body">
                  <div className="product-topline"><span>{product.category}</span><span>★ {product.rating}</span></div>
                  <h3>{product.name}</h3>
                  <p className="farmer-name">{product.farmer}</p>
                  <div className="price-line"><strong>₹{product.price}<small>/{product.unit}</small></strong><span>Market ₹{product.market}</span></div>
                  <div className="stock-line"><span>{product.stock} available</span><span>{Math.round((1-product.price/product.market)*100)}% lower</span></div>
                  <button className="add-btn" onClick={() => addToCart(product)}><ShoppingCart size={17}/> Add to cart</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-soft" id="dashboard">
          <div className="section-heading">
            <div>
              <span className="kicker">Farmer tools</span>
              <h2>Your farm at a glance</h2>
              <p>A simple dashboard to track orders, earnings, products and customer demand.</p>
            </div>
          </div>

          <div className="dashboard-grid">
            {[
              ["Orders", "125", "This month", PackageCheck],
              ["Earnings", "₹1,25,000", "Gross sales", HandCoins],
              ["Products", "35", "Active listings", Sprout],
              ["Customers", "210", "Reach to date", UserRound]
            ].map(([label, value, meta, Icon]) => (
              <div className="metric-card" key={label}>
                <div className="metric-top"><span>{label}</span><div className="metric-icon"><Icon size={18}/></div></div>
                <strong>{value}</strong>
                <small>{meta}</small>
              </div>
            ))}
          </div>

          <div className="split-grid">
            <div className="panel">
              <div className="panel-head"><div><span className="kicker">Workflow</span><h3>From listing to delivery</h3></div></div>
              <div className="timeline">
                {[
                  ["01", "List produce", "Set crop, quantity, photos and farmer price."],
                  ["02", "Get matched", "Buyers discover products by need and location."],
                  ["03", "Confirm order", "Agree quantity, delivery and payment."],
                  ["04", "Track & earn", "Update status and monitor earnings."]
                ].map(([n,t,d]) => (
                  <div className="timeline-item" key={n}>
                    <span>{n}</span><div><strong>{t}</strong><p>{d}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel weather-panel" id="prices">
              <div className="panel-head"><div><span className="kicker">Market watch</span><h3>Price comparison</h3></div><TrendingUp size={20}/></div>
              <div className="mini-table">
                {products.slice(0,4).map((p) => (
                  <div className="mini-row" key={p.id}><span>{p.name}</span><strong>₹{p.price}/kg</strong><em>Market ₹{p.market}</em></div>
                ))}
              </div>
              <div className="weather-mini"><CloudSun size={22}/><div><strong>32°C • Sunny</strong><span>Humidity 72% • Wind 15 km/h</span></div><span className="forecast-dot"></span></div>
            </div>
          </div>
        </section>

        <section className="section" id="orders">
          <div className="section-heading"><div><span className="kicker">Order management</span><h2>Keep every order visible</h2><p>Simple status updates make delivery and communication easier.</p></div></div>
          <div className="orders-panel">
            {orders.map((order) => (
              <div className="order-row" key={order.id}>
                <div><span className="order-id">{order.id}</span><strong>{order.item}</strong><small>{order.qty} • Buyer: {order.buyer}</small></div>
                <strong>{order.amount}</strong>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                <button className="tiny-btn" onClick={() => cycleOrder(order.id)}>Advance</button>
              </div>
            ))}
          </div>
        </section>

        <section className="section community-section" id="community">
          <div className="section-heading"><div><span className="kicker">Community</span><h2>Farmers helping farmers</h2><p>Share field insights, ask questions and build a stronger local network.</p></div></div>
          <div className="community-grid">
            <div className="posts">
              {posts.map((post, index) => (
                <article className="post-card" key={`${post.name}-${index}`}>
                  <div className="avatar">{post.name[0]}</div>
                  <div className="post-content"><strong>{post.name}</strong><p>{post.text}</p>
                    <div className="post-actions"><button onClick={() => setPosts((list) => list.map((p,i) => i === index ? {...p, likes:p.likes+1} : p))}>♥ {post.likes} Likes</button><button><MessageCircle size={15}/> Comment</button></div>
                  </div>
                </article>
              ))}
            </div>
            <div className="composer panel">
              <span className="kicker">Create a post</span>
              <h3>Start a useful conversation</h3>
              <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Share a farming tip or ask the community..." />
              <button className="primary-btn full" onClick={publishPost}>Publish post <ArrowRight size={17}/></button>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div><span className="kicker light">Built around farmer income</span><h2>Make every crop reach the right buyer.</h2><p>Direct access, clearer pricing and better visibility can create a fairer agricultural marketplace.</p></div>
          <a href="#marketplace" className="primary-btn light-btn">Start exploring <ArrowRight size={17}/></a>
        </section>
      </main>

      <footer className="footer">
        <div><a className="brand" href="#home"><span className="brand-mark"><Leaf size={18}/></span><span>Farm<span>Link</span></span></a><p>Empowering farmers through technology.</p></div>
        <div className="footer-links"><a href="#marketplace">Marketplace</a><a href="#dashboard">Dashboard</a><a href="#community">Community</a></div>
      </footer>

      <aside id="cart-panel" className="cart-panel">
        <div className="cart-head"><div><span className="kicker">Your order</span><h3>Cart ({cart.length})</h3></div><button onClick={() => document.getElementById("cart-panel")?.classList.remove("show")}><X/></button></div>
        <div className="cart-items">
          {cart.length === 0 ? <div className="empty-cart"><ShoppingCart size={42}/><strong>Your cart is empty</strong><p>Add fresh produce from the marketplace.</p></div> : cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt="" />
              <div><strong>{item.name}</strong><span>₹{item.price}/{item.unit}</span><div className="qty"><button onClick={() => changeQty(item.id,-1)}>−</button><b>{item.qty}</b><button onClick={() => changeQty(item.id,1)}>+</button></div></div>
            </div>
          ))}
        </div>
        {cart.length > 0 && <div className="cart-foot"><div><span>Total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><button className="primary-btn full" onClick={() => { setCart([]); showToast("Order placed successfully"); }}>Place direct order</button></div>}
      </aside>

      {toast && <div className="toast"><CheckCircle2 size={18}/> {toast}</div>}
    </div>
  );
}

function SparkLeaf() {
  return <span className="spark"><Leaf size={15}/></span>;
}

createRoot(document.getElementById("root")).render(<App />);