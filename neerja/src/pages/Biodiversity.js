import React from "react";

const BiodiversityPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 min-h-screen">
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-12 py-8 md:py-12 max-w-[1600px] mx-auto">
        <div className="fade-in mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Marine Biodiversity
          </h2>
        </div>

        {/* Search & Filters */}
        <div className="fade-in mb-8" style={{ animationDelay: "50ms" }}>
          <div className="bg-background-light dark:bg-background-dark/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="relative col-span-1 md:col-span-2">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-background-dark border border-black-300 dark:border-black-600 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Search species, ecosystems..."
                  type="text"
                />
              </div>
              <div className="col-span-1">
                <select className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary">
                  <option>All Categories</option>
                  <option>Marine Species</option>
                  <option>Ecosystems</option>
                  <option>Conservation</option>
                </select>
              </div>
              <div className="col-span-1">
                <select className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary">
                  <option>Filter by Status</option>
                  <option>Endangered</option>
                  <option>Threatened</option>
                  <option>Stable</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Species Carousel */}
        <section className="fade-in " style={{ animationDelay: "100ms" }}>
       <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
  Featured & Endangered Species
</h3>



     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {[
    {
      title: "Hawksbill Sea Turtle",
      status: "Critically Endangered",
      statusColor: "red-500",
      description:
        "Known for their beautiful shells, they are vital for coral reef health. Threatened by poaching and habitat loss.",
      image: "images/img2.jpg",
    },
    {
      title: "Vaquita",
      status: "Critically Endangered",
      statusColor: "red-500",
      description:
        "The world's rarest marine mammal, on the brink of extinction due to illegal fishing net entanglement.",
      image: "images/img3.png",
    },
    {
      title: "Bluefin Tuna",
      status: "Endangered",
      statusColor: "orange-500",
      description:
        "A magnificent predator facing severe overfishing. Crucial for maintaining balance in the marine food web.",
      image: "images/img4.png",
    },
  ].map((species, idx) => (
    <div
      key={idx}
      className="relative overflow-hidden rounded-xl shadow-lg bg-background-light dark:bg-background-dark/50"
    >
      <img
        src={species.image}
        alt={species.title}
        className="w-full h-64 md:h-80 object-cover rounded-t-xl"
      />
      <div className="p-6">
        <span
          className={`absolute top-4 right-4 text-white text-xs font-bold px-2 py-1 rounded-full bg-${species.statusColor}/80`}
        >
          {species.status}
        </span>
        <h4 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-2">
          {species.title}
        </h4>
        <p className="text-white mb-4">
          {species.description}
        </p>
      </div>
    </div>
  ))}
</div>
    </section>


        {/* Marine Species Grid */}
        <section className="fade-in mt-12" style={{ animationDelay: "150ms" }}>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Marine Species
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Coral Reefs", desc: "Vibrant ecosystems", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTHYoltExeT9wjF-wo8eso6giubZ8j38Ehd6mC8orgDaOj3BDcGYMWT93WytUmdG93W1BQsNw74FDXc-7jKr_URgkN6k6ci0IxQZ3lS65O8QRfPIvdl0Ow8jG2J480lZ1gpJ0wMFQtr2L91Q7w3jTm48tNfJpJLrd5fIdSOzwz3CmiVRmW5FdZtWz_AkLne5Ib7PQPge0Ixijldli-kfTQNFUG4ZgfVVWu2Ws9G-qRnCtmESf7crWLfv1H3AUcVqDjmp4p3s4JBVPZ" },
              { name: "Whales", desc: "Gentle giants", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlQsvH9OHcMSl239VAkY9jZy_0TgM8aEwWCaivyu1DVoHRkADn-at6uCpuUD-DhpzOYSl4tYwEYFQ9wXu6OtMw6Rp5dmqEswOAbYBsxSOtLXhmvhPFu7c-wBtmpGwPAhf2JvmdFb3GXOJej6F95RzjbvZ8zI0nDtT9314Ta8xiaG4k1ZAAagrAVFCVVEYlifdp-hvmGp0dormJtQkhLNBWjNM1KVo8qviGRox8AM1ayg_UZwfzTDNndJeVlSN0Hq7eneg9Kfe4-N4b" },
              { name: "Sea Turtles", desc: "Ancient mariners", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM6MXkvnNWvVWCLvjF7TNE9nryd_tSTxAm7dHbXS4Yl7HJcC8NvbzH7qB980uPjI_moIjwQzcOH65m6Yf5ekcNqkS9YyddeVohaFUMZVWrSambp2DVg2hUYGB6cmBdKD6k1C1vIq-cEpy91m7cTfsYXXODCTB4ZNcCyx7CNKkOh2T1PAKZH1KuYioPobwVYrPq-gdyLa4cR7gxheFzc9UVs-OA4vmA24cqiq2NC1DFQeixhh4wcqGvDataKRw1OvL4TwYBpR9G-QhJ" },
              { name: "Seabirds", desc: "Aerial acrobats", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuANKG6p8ogSKSkkpQ4SSu_m8n5eb2fyAWv6PSs4tX6F0-3lRco92PcTKpkB52cGaIhOHuLRFjqayrfOcqI1uPzRdWJaVrKM_gXFLgQyRiYdViZHiMxwnUhv_2Lk9Ey_PVe2d9Jcod6pIBQhkJ6zly10ZQj6oAOvnDPjL_dbevOCKbiOF8k6ZL8VhMynjjxVxCxdj31s9ogy4MGW9JJsY4gZaVw9sQTP_6YtBioklfdtFdaj-aHkMWhQSkg0p52qW5FT_D2qrFRYlZ4T" },
              { name: "Fish", desc: "Diverse aquatic life", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCik4bbK1WhWKwm-FofQ4oqwBwAlTVYMXgYTBO4S6_1IO54YOByl6cQ4W-2psMB9UfpFVMC4WeKKEMvn43cw0UNpfp9ssJXk0vl_obf8NMli0mvG_6qg81eyACt_w7QxYSj_rLURY8ff6vdGrozDgFBt9TZB6tjaSiQ8ZhtixOHzTWmNjJxQtkrUB61yrCR5arUXofKfneRw-XGbubyY3aCNgTHVx2Tuf3aXWhbBo24Q0x-XOP012hm9oidvTxAWpJlVIyEPAHKc_kL" },
              { name: "Marine Mammals", desc: "Intelligent inhabitants", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD_dFL5ArWJdnUu_gGoQBxloI3cAVvt9vszj4A45XOjVNRwpCUHO6gfckMDwB7IYpawGn2xodVgUnnHqoaCEiIqwWSJ-Cph5wzGblYwcJJJEqb6XXzrCTFaP9o4a0mjbDQD-AnBsCAIS2vY7LX2fUgSjYNj5gveRGQ6F6o_J2uNbZacnHie7oNtsJJuHpCsrtcOLVzUHmR3kGVKVhvl0nbdu2KBp61VBB2l2tdh2Wn2EsOXV64XLIeOulb-eMrclaG2D2y3BdHE-2A" },
            ].map((species, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <div
                    className="aspect-square bg-cover bg-center rounded-lg transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url('${species.img}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="font-semibold text-yellow-300 mb-1">
                  {species.name}
                </h4>
                <p className="text-sm text-white">
                  {species.desc}
                </p>
              </div>
            ))}
          </div>
        </section>



         {/* Ecosystems */}
         <section className="fade-in mt-16">  {/* 👈 Added margin-top */}
  <h3 className="text-4xl font-bold mb-8 text-white">Ecosystems</h3> 

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Mangrove Forests", desc: "Coastal nurseries of the sea", img: "images/bio1.png" },
                { title: "Kelp Forests", desc: "Underwater forests of the coast", img: "images/bio2.png" },
                { title: "Seagrass Beds", desc: "Submerged meadows of the ocean", img: "images/bio3.png" },
                { title: "Deep Sea Vents", desc: "Mysterious deep-sea habitats", img: "images/bio4.png " },
              ].map((eco, i) => (
                <div key={i} className="relative overflow-hidden rounded-xl group">
                  <img src={eco.img} alt={eco.title} className="h-64 w-full object-cover group-hover:scale-105 transition-transform" />
                 <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
  <h4 className="font-bold text-xl text-yellow-300">{eco.title}</h4>
  <p className="text-gray-200">{eco.desc}</p>
</div>

                </div>
              ))}
            </div>


          </section>
      </main>
      <footer className="bg-background-light dark:bg-background-dark border-t border-primary/20 dark:border-primary/30 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 text-center text-sm text-white">
          <p>© 2024 Ocean Insights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BiodiversityPage;
