export default function HomePage() {
  return (
    <div className="bg-gray-100 text-gray-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-red-600">turizm.ge</h1>
        </div>
      </header>

      <main>
        <section
          className="w-full aspect-[1536/1024] bg-cover bg-center"
          style={{ backgroundImage: "url('https://i.ibb.co/MD9TXLQF/turizm.webp')" }}
        />

        <section className="bg-white py-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold text-gray-800">Discover Georgia</h2>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8">Popular Destinations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-xl font-bold mb-2">Tbilisi</h4>
                <p>The vibrant capital city.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-xl font-bold mb-2">Batumi</h4>
                <p>A modern city on the Black Sea coast.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-xl font-bold mb-2">Svaneti</h4>
                <p>A historic region in the Caucasus Mountains.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-200 py-12">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8">Georgian Cuisine</h3>
            <p className="text-center">Discover the unique flavors of Georgian food and wine.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8">Activities</h3>
            <p className="text-center">From hiking in the mountains to exploring ancient monasteries.</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 turizm.ge</p>
        </div>
      </footer>
    </div>
  );
}
