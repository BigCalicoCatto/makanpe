import React, { useState } from 'react';
import { RefreshCw, Menu, X } from 'lucide-react';

type FoodItem = { name: string; emoji: string };
type GiftItem = { name: string; budget: string; occasion: string; emoji: string; price: string; link: string };
type StoryItem = { text: string };

type SelectedItem =
  | { type: 'food'; data: FoodItem }
  | { type: 'gift'; data: GiftItem }
  | { type: 'story'; data: StoryItem }
  | null;

const MegaRandomizer = () => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [selectedCategory, setSelectedCategory] = useState<'semua' | 'mamak' | 'tomyam' | 'fastfood'>('semua');
  const [currentView, setCurrentView] = useState<'food' | 'brainrot' | 'gift'>('food');
  const [isAnimating, setIsAnimating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [giftFilters, setGiftFilters] = useState({ budget: 'all', occasion: 'all' });

  const foodData = {
    mamak: [
      { name: "Roti Canai", emoji: "🫓" },
      { name: "Nasi Kandar", emoji: "🍛" },
      { name: "Maggi Goreng", emoji: "🍜" },
      { name: "Roti Tissue", emoji: "🥞" },
      { name: "Teh Tarik + Roti Bakar", emoji: "☕" },
      { name: "Murtabak", emoji: "🥙" },
      { name: "Nasi Lemak Mamak", emoji: "🍚" },
      { name: "Roti Bom", emoji: "🍞" },
    ],
    tomyam: [
      { name: "Tomyam Campur", emoji: "🍲" },
      { name: "Nasi Goreng Paprik", emoji: "🍛" },
      { name: "Nasi Goreng Tomyam", emoji: "🍚" },
      { name: "Tomyam Seafood", emoji: "🦐" },
      { name: "Kerang Bakar", emoji: "🦀" },
      { name: "Siakap 3 Rasa", emoji: "🐟" },
      { name: "Udang Butter", emoji: "🦐" },
      { name: "Nasi Putih + Ayam Goreng Berempah", emoji: "🍗" },
    ],
    fastfood: [
      { name: "KFC", emoji: "🍗" },
      { name: "McDonald's", emoji: "🍔" },
      { name: "Texas Chicken", emoji: "🍗" },
      { name: "Burger King", emoji: "🍔" },
      { name: "Pizza Hut", emoji: "🍕" },
      { name: "Subway", emoji: "🥪" },
      { name: "Domino's", emoji: "🍕" },
    ]
  };

  const giftData = [
    { name: "Custom Keychain With Photo", budget: "low", occasion: "any", emoji: "🔑", price: "RM25-40", link: "shopee" },
    { name: "Favorite Snacks Gift Box", budget: "low", occasion: "any", emoji: "🍫", price: "RM30-50", link: "shopee" },
    { name: "Funny Socks Set", budget: "low", occasion: "birthday", emoji: "🧦", price: "RM20-35", link: "shopee" },
    { name: "Phone Pop Socket Custom", budget: "low", occasion: "any", emoji: "📱", price: "RM15-30", link: "shopee" },
    { name: "Mini Succulent Plant", budget: "low", occasion: "any", emoji: "🌵", price: "RM20-40", link: "shopee" },
    { name: "Personalized Mug", budget: "low", occasion: "any", emoji: "☕", price: "RM25-45", link: "shopee" },
    { name: "Perfume Set", budget: "mid", occasion: "any", emoji: "🎁", price: "RM80-150", link: "shopee" },
    { name: "Smart Watch Strap", budget: "mid", occasion: "any", emoji: "⌚", price: "RM50-120", link: "lazada" },
    { name: "Leather Wallet", budget: "mid", occasion: "birthday", emoji: "👛", price: "RM60-140", link: "shopee" },
    { name: "Wireless Earbuds", budget: "mid", occasion: "any", emoji: "🎧", price: "RM80-150", link: "lazada" },
    { name: "Grooming Kit Set", budget: "mid", occasion: "birthday", emoji: "💈", price: "RM70-130", link: "shopee" },
    { name: "Massage Gun Mini", budget: "mid", occasion: "any", emoji: "💆", price: "RM90-150", link: "lazada" },
    { name: "Polaroid Camera Film Set", budget: "mid", occasion: "anniversary", emoji: "📸", price: "RM80-140", link: "shopee" },
    { name: "Customized Jersey", budget: "mid", occasion: "birthday", emoji: "👕", price: "RM100-150", link: "shopee" },
    { name: "Nike/Adidas Sneakers", budget: "high", occasion: "birthday", emoji: "👟", price: "RM200-300", link: "lazada" },
    { name: "Mechanical Keyboard", budget: "high", occasion: "any", emoji: "⌨️", price: "RM180-280", link: "lazada" },
    { name: "Gaming Mouse + Pad Set", budget: "high", occasion: "birthday", emoji: "🖱️", price: "RM150-250", link: "shopee" },
    { name: "Bluetooth Speaker Premium", budget: "high", occasion: "any", emoji: "🔊", price: "RM180-300", link: "lazada" },
    { name: "Smartwatch", budget: "high", occasion: "anniversary", emoji: "⌚", price: "RM200-300", link: "lazada" },
    { name: "Weekend Staycation", budget: "high", occasion: "anniversary", emoji: "🏨", price: "RM200-300", link: "agoda" },
    { name: "AirPods Pro", budget: "premium", occasion: "anniversary", emoji: "🎧", price: "RM900+", link: "lazada" },
    { name: "PS5 Game + Controller", budget: "premium", occasion: "birthday", emoji: "🎮", price: "RM350-500", link: "shopee" },
    { name: "Designer Wallet/Belt", budget: "premium", occasion: "anniversary", emoji: "👔", price: "RM400-800", link: "lazada" },
    { name: "iPhone Accessories Bundle", budget: "premium", occasion: "any", emoji: "📱", price: "RM300-600", link: "lazada" },
    { name: "Premium Perfume Set", budget: "premium", occasion: "anniversary", emoji: "💝", price: "RM350-700", link: "shopee" },
  ];

  const brainRotStories = [
    { text: "Aku order nasi lemak pukul 3 pagi. Rider sampai, tapi muka dia takde. Kosong. Dia hulur plastik, aku ambil. Dalam tu ada nota: 'Terima kasih kerana order terakhir saya.' Aku buka nasi lemak, ada gambar aku tidur dalam bilik aku. Aku sorang je rumah. Pintu bilik perlahan-lahan terbuka. Nasi lemak tu sejuk. Telur dia pecah. Sambal dia merah pekat macam darah. Aku makan jugak sebab lapar. Sedap. 10/10. Tapi sekarang cermin aku takde refleksi aku." },
    { text: "Malam tadi aku mimpi mak aku masak rendang. Pagi ni aku bangun, bau rendang betul-betul wangi. Aku turun bawah. Dapur gelap. Periuk atas dapur menggelegak sorang-sorang. Takde api pun. Aku bukak. Dalam tu ada daging masak sendiri. Aku rasa sikit. Confirm rendang mak aku. Tapi mak aku dah meninggal 3 tahun lepas. Aku nangis sambil makan. Paling sedap rendang pernah aku rasa. Esok aku bangun, mulut aku berdarah. Gigi aku patah semua." },
    { text: "Aku pergi KFC, order bucket. Ayam dalam bucket tu pandang aku. Dia cakap 'bro, aku dah goreng, bagi lah chance.' Aku terkejut. Ayam tu keluaq phone, tunjuk family portrait dia. Anak bini semua ayam. Aku rasa bersalah. Lepas tu dia gelak kuat gila, 'GOTCHA! Aku takde family pun!' Pastu dia tikam aku dengan garpu plastik. Aku pengsan. Bila sedaq balik, aku dalam fryer. Sekarang aku jadi nugget. Kolej aku datang beli aku. Circle of life." },
    { text: "Aku makan Indomie goreng pastu rasa macam boleh faham bahasa semut. Semut kat rumah aku buat meeting pasal nak amik alih dapur. Queen semut dia cakap aku ni threat. Diorang plan nak gigit kaki aku time aku tidur. Aku panik, aku vacuum semua semut. Tapi dalam vacuum tu diorang buat civilization baru. Ada building, ada kereta. Aku buka vacuum, keluar semut pakai suit. Diorang sue aku kat court semut. Aku kalah. Sekarang aku kena bayar compensation gula sebiji guni sebulan. Lawyer aku pun semut." },
    { text: "Nenek aku bagi resepi kari ayam pusaka. Dia cakap ini resepi 200 tahun. Aku cuba masak ikut exact. Midway masak, ayam dalam periuk naik balik hidup. Dia cakap 'Woi, kau guna resepi haram ke?' Aku terkejut hampir terbakar dapur. Ayam tu marah, cakap resepi ni cursed, sesiapa masak akan kena buli dengan ayam hidup semula. Aku mintak maaf kat ayam tu. Dia cool down, offer tolong aku masak sama-sama. Kitorang jadi kawan. Sekarang dia duduk rumah aku, main PS5 hari-hari. Nama dia Brad. Brad tak kerja, tapi claim dia emotional support chicken. Mak aku bengang." },
    { text: "Arwah ayah aku suka sangat makan soto. Setiap weekend mesti beli kat gerai Pak Mat. Lepas ayah meninggal, aku still pergi gerai tu. Pak Mat dah tua, tangan dia menggeletar. Aku order soto macam biasa. Dia pandang aku lama, mata dia berair. Dia cakap 'Awak macam arwah ayah awak dulu. Dia selalu duduk kerusi tu.' Aku tengok kerusi sebelah aku kosong, tapi rasa macam ada warmth. Pak Mat bagi extra daging, cakap 'Dari ayah awak.' Aku makan perlahan. Teringat semua kenangan. Soto tu masin sikit hari tu. Entah air mata sapa." },
  ];

  const getAllFood = () => {
    return [...foodData.mamak, ...foodData.tomyam, ...foodData.fastfood];
  };

  const getFilteredGifts = () => {
    return giftData.filter(gift => {
      if (giftFilters.budget !== 'all' && gift.budget !== giftFilters.budget) return false;
      if (giftFilters.occasion !== 'all' && gift.occasion !== giftFilters.occasion && gift.occasion !== 'any') return false;
      return true;
    });
  };

  const randomize = () => {
    setIsAnimating(true);
    
    if (currentView === 'food') {
      let foodList = selectedCategory === 'semua' 
        ? getAllFood() 
        : selectedCategory === 'mamak' ? foodData.mamak
        : selectedCategory === 'tomyam' ? foodData.tomyam
        : foodData.fastfood;
      const randomIndex = Math.floor(Math.random() * foodList.length);
      setTimeout(() => {
        setSelectedItem({ type: 'food', data: foodList[randomIndex] });
        setIsAnimating(false);
      }, 300);
    } else if (currentView === 'brainrot') {
      const randomIndex = Math.floor(Math.random() * brainRotStories.length);
      setTimeout(() => {
        setSelectedItem({ type: 'story', data: brainRotStories[randomIndex] });
        setIsAnimating(false);
      }, 300);
    } else if (currentView === 'gift') {
      const filteredGifts = getFilteredGifts();
      if (filteredGifts.length === 0) {
        alert('Takde gift match your filters! Cuba adjust filters.');
        setIsAnimating(false);
        return;
      }
      const randomIndex = Math.floor(Math.random() * filteredGifts.length);
      setTimeout(() => {
        setSelectedItem({ type: 'gift', data: filteredGifts[randomIndex] });
        setIsAnimating(false);
      }, 300);
    }
  };

  const switchView = (view: 'food' | 'brainrot' | 'gift') => {
    setCurrentView(view);
    setSelectedItem(null);
    setMenuOpen(false);
  };

  const selectCategory = (catId: 'semua' | 'mamak' | 'tomyam' | 'fastfood') => {
    setSelectedCategory(catId);
    setMenuOpen(false);
  };

  const getViewTitle = () => {
    if (currentView === 'food') return 'Makan Apa?';
    if (currentView === 'brainrot') return 'Brain Rot';
    if (currentView === 'gift') return 'Hadiah Apa?';
  };

  const getViewSubtitle = () => {
    if (currentView === 'food') return selectedCategory === 'semua' ? 'Semua' : 
      selectedCategory === 'mamak' ? 'Kedai Mamak' :
      selectedCategory === 'tomyam' ? 'Kedai Tomyam' : 'Fast Food';
    if (currentView === 'brainrot') return 'Baca cerita cursed';
    if (currentView === 'gift') return 'Hadiah untuk boyfriend/girlfriend';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 relative">
        
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-6 right-6 p-3 hover:bg-gray-100 rounded-lg transition-all z-30"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Slide-out Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold">RANDOMIZER</h3>
                <p className="text-xs text-gray-500">Life made simple</p>
              </div>
              <button onClick={() => setMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Main Sections */}
            <div className="mb-6">
              <button
                onClick={() => switchView('food')}
                className={`w-full text-left p-4 rounded-lg mb-2 font-semibold transition-all ${
                  currentView === 'food' ? 'bg-orange-500 text-white' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                🍽️ Makan Apa
              </button>
              <button
                onClick={() => switchView('brainrot')}
                className={`w-full text-left p-4 rounded-lg mb-2 font-semibold transition-all ${
                  currentView === 'brainrot' ? 'bg-purple-500 text-white' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                🧠 Brain Rot
              </button>
              <button
                onClick={() => switchView('gift')}
                className={`w-full text-left p-4 rounded-lg font-semibold transition-all ${
                  currentView === 'gift' ? 'bg-pink-500 text-white' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                🎁 Hadiah Apa
              </button>
            </div>

            {/* Food Categories */}
            {currentView === 'food' && (
              <>
                <div className="text-sm text-gray-500 mb-2 font-medium">Kategori Makanan</div>
                <div className="space-y-2">
                  {[
                    { id: 'semua', name: 'Semua' },
                    { id: 'mamak', name: 'Kedai Mamak' },
                    { id: 'tomyam', name: 'Kedai Tomyam' },
                    { id: 'fastfood', name: 'Fast Food' },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => selectCategory(cat.id as any)}
                      className={`w-full text-left p-3 rounded-lg transition-all text-sm ${
                        selectedCategory === cat.id ? 'bg-orange-100 text-orange-700 font-medium' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Gift Filters */}
            {currentView === 'gift' && (
              <>
                <div className="text-sm text-gray-500 mb-2 font-medium">Budget</div>
                <select
                  value={giftFilters.budget}
                  onChange={(e) => setGiftFilters({...giftFilters, budget: e.target.value})}
                  className="w-full p-3 rounded-lg border mb-4 text-sm"
                >
                  <option value="all">All Budgets</option>
                  <option value="low">&lt; RM50</option>
                  <option value="mid">RM50 - RM150</option>
                  <option value="high">RM150 - RM300</option>
                  <option value="premium">RM300+</option>
                </select>

                <div className="text-sm text-gray-500 mb-2 font-medium">Occasion</div>
                <select
                  value={giftFilters.occasion}
                  onChange={(e) => setGiftFilters({...giftFilters, occasion: e.target.value})}
                  className="w-full p-3 rounded-lg border text-sm"
                >
                  <option value="all">All Occasions</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="any">Just Because</option>
                </select>
              </>
            )}
          </div>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black bg-opacity-30 z-40" />
        )}

        {/* Main Content */}
        <div className="w-full max-w-2xl text-center px-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">{getViewTitle()}</h1>
          <p className="text-gray-500 mb-12">{getViewSubtitle()}</p>

          {/* Results */}
          {selectedItem && (
            <div className={`mb-12 transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
              
              {/* Food Result */}
              {selectedItem.type === 'food' && (
                <>
                  <div className="text-9xl mb-6">{selectedItem.data.emoji}</div>
                  <h2 className="text-4xl font-bold text-gray-900">{selectedItem.data.name}</h2>
                </>
              )}

              {/* Story Result */}
              {selectedItem.type === 'story' && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg">
                  <div className="text-5xl mb-6">🧠💀</div>
                  <p className="text-lg leading-relaxed text-gray-800 text-left">{selectedItem.data.text}</p>
                </div>
              )}

              {/* Gift Result */}
              {selectedItem.type === 'gift' && (
                <div className="bg-gradient-to-br from-pink-50 to-red-50 p-8 rounded-2xl shadow-lg">
                  <div className="text-7xl mb-4">{selectedItem.data.emoji}</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedItem.data.name}</h2>
                  <p className="text-xl text-pink-600 font-semibold mb-4">{selectedItem.data.price}</p>
                  <a
                    href={`https://${selectedItem.data.link}.com.my`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-all"
                  >
                    Beli Sekarang di {selectedItem.data.link.charAt(0).toUpperCase() + selectedItem.data.link.slice(1)}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Button */}
          <button
            onClick={randomize}
            disabled={isAnimating}
            className={`${
              currentView === 'food' ? 'bg-orange-500 hover:bg-orange-600' : 
              currentView === 'brainrot' ? 'bg-purple-500 hover:bg-purple-600' :
              'bg-pink-500 hover:bg-pink-600'
            } text-white font-bold py-5 px-12 rounded-full text-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 inline-flex items-center gap-3`}
          >
            <RefreshCw size={24} className={isAnimating ? 'animate-spin' : ''} />
            {selectedItem ? 'Cuba Lagi' : 'Randomize!'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-3">
            <a href="#about" className="hover:text-gray-900">About Us</a>
            <span className="text-gray-300">|</span>
            <a href="#privacy" className="hover:text-gray-900">Privacy Policy</a>
            <span className="text-gray-300">|</span>
            <a href="#contact" className="hover:text-gray-900">Contact</a>
            <span className="text-gray-300">|</span>
            <a href="#terms" className="hover:text-gray-900">Terms</a>
          </div>
          <p className="text-xs text-gray-400">© 2025 Randomizer.my - Life made simple 🎲</p>
        </div>
      </footer>
    </div>
  );
};

export default MegaRandomizer;
