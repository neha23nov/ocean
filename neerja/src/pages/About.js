import React from "react";

function About() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#111618] text-white">
  

      <div className="relative flex h-full grow flex-col">
        {/* Main Content */}
        <main className="flex-1 px-16 py-16">
          <div className="max-w-5xl mx-auto">
            {/* About Section */}
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold tracking-tight">
                About the Neerja Dashboard
              </h2>
              <p className="mt-6 text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                A comprehensive platform designed to provide scientists, researchers, and
                conservationists with access to critical ocean data. Our mission is to
                facilitate informed decision-making and advance ocean research and
                conservation efforts by making complex data accessible and understandable.
              </p>
            </div>

            {/* Why Ocean Data Matters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Why Ocean Data Matters</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Ocean data is essential for understanding the health of our oceans and the
                  impact of climate change. Monitoring parameters such as temperature,
                  salinity, currents, and winds helps us track changes over time, predict
                  future trends, and develop effective conservation strategies. Fisheries
                  data, coral reef health, and plankton density data provide insights into
                  marine ecosystems and biodiversity.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src="https://via.placeholder.com/600x400"
                  alt="Ocean Data"
                />
              </div>
            </div>

            {/* Our Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
              <div className="rounded-lg overflow-hidden md:order-2">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src="https://via.placeholder.com/600x400"
                  alt="Sea turtle swimming"
                />
              </div>
              <div className="md:order-1">
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Our goal is to democratize access to vital oceanographic information. We
                  believe that by providing powerful, intuitive tools for data visualization
                  and analysis, we can empower the scientific community to tackle some of
                  the most pressing environmental challenges of our time.
                </p>
              </div>
            </div>

            {/* Visualization Gallery */}
            <div className="bg-[#1A2226]/80 p-10 rounded-lg mb-20 backdrop-blur-sm">
              <h3 className="text-3xl font-bold mb-8 text-center">Visualization Gallery</h3>
              <p className="text-white/80 text-center mb-10 text-lg max-w-4xl mx-auto leading-relaxed">
                Explore a few examples of the powerful data visualizations available on our
                interactive dashboard.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="group relative overflow-hidden rounded-lg">
                    <img
                      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                      src="https://via.placeholder.com/300x200"
                      alt={`Visualization ${i}`}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                      <p className="text-white font-semibold text-base">
                        Visualization {i}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-[#1A2226]/80 p-10 rounded-lg mb-20 backdrop-blur-sm">
              <h3 className="text-3xl font-bold mb-8 text-center">Data Sources</h3>
              <p className="text-white/80 text-center mb-10 text-lg max-w-4xl mx-auto leading-relaxed">
                Our dashboard integrates data from various reputable sources, including
                satellite observations, in-situ measurements from buoys and research
                vessels, and global ocean models.
              </p>
            </div>

            {/* Team & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold mb-6">Our Team</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  The Ocean Insights Dashboard is developed and maintained by a dedicated
                  team of oceanographers, data scientists, and software engineers.
                </p>
                <button className="bg-transparent border border-white/30 text-white/90 hover:bg-white/10 transition-colors py-3 px-6 rounded-md text-base font-medium flex items-center gap-3">
                  Meet the Team <span className="material-symbols-outlined text-base">→</span>
                </button>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  For questions, feedback, or collaboration opportunities, please reach out.
                </p>
                <form className="space-y-4">
                  <input
                    className="w-full bg-[#1A2226] border-none rounded-md px-5 py-3 text-base focus:ring-2 focus:ring-[#1193d4]"
                    placeholder="Your email address"
                    type="email"
                  />
                  <textarea
                    className="w-full bg-[#1A2226] border-none rounded-md px-5 py-3 text-base focus:ring-2 focus:ring-[#1193d4]"
                    placeholder="Your message..."
                    rows="5"
                  ></textarea>
                  <button
                    className="w-full bg-[#1193d4] text-white font-bold py-3 px-6 rounded-md text-base hover:bg-opacity-90 transition-colors"
                    type="submit"
                  >
                    Send Feedback
                  </button>
                </form>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default About;
