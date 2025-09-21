// src/pages/BiodiversityPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BiodiversityPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const navigate = useNavigate();

  const openModal = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  const openSpeciesPage = (species) => {
    navigate(`/species/${encodeURIComponent(species.name || species.title)}`, {
      state: { species },
    });
  };

  // ---------- DATA ----------
  const featuredSpecies = [
    {
      title: "Hawksbill Sea Turtle",
      category: "Turtles",
      status: "Critically Endangered",
      statusColor: "red-500",
      description:
        "Known for their beautiful shells, they are vital for coral reef health.",
      image: "images/img2.jpg",
      details:
        "Hawksbill turtles live mostly in tropical reefs and are vital for coral health.",
      datasetLink: "https://example.com/hawksbill-data",
    },
    {
      title: "Vaquita",
      category: "Marine Mammals",
      status: "Critically Endangered",
      statusColor: "red-500",
      description:
        "The world's rarest marine mammal, on the brink of extinction.",
      image: "images/img3.png",
      details: "Vaquitas are tiny porpoises found in the Gulf of California.",
      datasetLink: "https://example.com/vaquita-data",
    },
    {
      title: "Bluefin Tuna",
      category: "Fishes",
      status: "Endangered",
      statusColor: "orange-500",
      description: "A magnificent predator facing severe overfishing.",
      image: "images/img4.png",
      details: "Bluefin tuna migrate across oceans and are heavily fished.",
      datasetLink: "https://example.com/bluefin-data",
    },
  ];

  const marineSpecies = [
    {
      name: "Coral Reefs",
      desc: "Vibrant ecosystems",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTHYoltExeT9wjF-wo8eso6giubZ8j38Ehd6mC8orgDaOj3BDcGYMWT93WytUmdG93W1BQsNw74FDXc-7jKr_URgkN6k6ci0IxQZ3lS65O8QRfPIvdl0Ow8jG2J480lZ1gpJ0wMFQtr2L91Q7w3jTm48tNfJpJLrd5fIdSOzwz3CmiVRmW5FdZtWz_AkLne5Ib7PQPge0Ixijldli-kfTQNFUG4ZgfVVWu2Ws9G-qRnCtmESf7crWLfv1H3AUcVqDjmp4p3s4JBVPZ",
      details: "Coral reefs host thousands of marine species.",
      datasetLink: "https://example.com/coral-reef-data",
      category: "Coral Reefs",
      status: "Stable",
    },
    {
      name: "Whales",
      desc: "Gentle giants",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlQsvH9OHcMSl239VAkY9jZy_0TgM8aEwWCaivyu1DVoHRkADn-at6uCpuUD-DhpzOYSl4tYwEYFQ9wXu6OtMw6Rp5dmqEswOAbYBsxSOtLXhmvhPFu7c-wBtmpGwPAhf2JvmdFb3GXOJej6F95RzjbvZ8zI0nDtT9314Ta8xiaG4k1ZAAagrAVFCVVEYlifdp-hvmGp0dormJtQkhLNBWjNM1KVo8qviGRox8AM1ayg_UZwfzTDNndJeVlSN0Hq7eneg9Kfe4-N4b",
      details: "Whales are large marine mammals found in oceans.",
      datasetLink: "https://example.com/whales-data",
      category: "Marine Mammals",
      status: "Endangered",
    },
    {
      name: "Sea Turtles",
      desc: "Ancient mariners",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM6MXkvnNWvVWCLvjF7TNE9nryd_tSTxAm7dHbXS4Yl7HJcC8NvbzH7qB980uPjI_moIjwQzcOH65m6Yf5ekcNqkS9YyddeVohaFUMZVWrSambp2DVg2hUYGB6cmBdKD6k1C1vIq-cEpy91m7cTfsYXXODCTB4ZNcCyx7CNKkOh2T1PAKZH1KuYioPobwVYrPq-gdyLa4cR7gxheFzc9UVs-OA4vmA24cqiq2NC1DFQeixhh4wcqGvDataKRw1OvL4TwYBpR9G-QhJ",
      details: "Sea turtles navigate oceans and lay eggs on beaches.",
      datasetLink: "https://example.com/sea-turtles-data",
      category: "Turtles",
      status: "Critically Endangered",
    },
    {
      name: "Seabirds",
      desc: "Aerial acrobats",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuANKG6p8ogSKSkkpQ4SSu_m8n5eb2fyAWv6PSs4tX6F0-3lRco92PcTKpkB52cGaIhOHuLRFjqayrfOcqI1uPzRdWJaVrKM_gXFLgQyRiYdViZHiMxwnUhv_2Lk9Ey_PVe2d9Jcod6pIBQhkJ6zly10ZQj6oAOvnDPjL_dbevOCKbiOF8k6ZL8VhMynjjxVxCxdj31s9ogy4MGW9JJsY4gZaVw9sQTP_6YtBioklfdtFdaj-aHkMWhQSkg0p52qW5FT_D2qrFRYlZ4T",
      details: "Seabirds live along coastlines and migrate long distances.",
      datasetLink: "https://example.com/seabirds-data",
      category: "Marine Species",
      status: "Stable",
    },
    {
      name: "Fish",
      desc: "Diverse aquatic life",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCik4bbK1WhWKwm-FofQ4oqwBwAlTVYMXgYTBO4S6_1IO54YOByl6cQ4W-2psMB9UfpFVMC4WeKKEMvn43cw0UNpfp9ssJXk0vl_obf8NMli0mvG_6qg81eyACt_w7QxYSj_rLURY8ff6vdGrozDgFBt9TZB6tjaSiQ8ZhtixOHzTWmNjJxQtkrUB61yrCR5arUXofKfneRw-XGbubyY3aCNgTHVx2Tuf3aXWhbBo24Q0x-XOP012hm9oidvTxAWpJlVIyEPAHKc_kL",
      details: "Fish inhabit all levels of the ocean.",
      datasetLink: "https://example.com/fish-data",
      category: "Fishes",
      status: "Stable",
    },
    {
      name: "Marine Mammals",
      desc: "Intelligent inhabitants",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD_dFL5ArWJdnUu_gGoQBxloI3cAVvt9vszj4A45XOjVNRwpCUHO6gfckMDwB7IYpawGn2xodVgUnnHqoaCEiIqwWSJ-Cph5wzGblYwcJJJEqb6XXzrCTFaP9o4a0mjbDQD-AnBsCAIS2vY7LX2fUgSjYNj5gveRGQ6F6o_J2uNbZacnHie7oNtsJJuHpCsrtcOLVzUHmR3kGVKVhvl0nbdu2KBp61VBB2l2tdh2Wn2EsOXV64XLIeOulb-eMrclaG2D2y3BdHE-2A",
      details: "Marine mammals like dolphins and seals are highly intelligent.",
      datasetLink: "https://example.com/marine-mammals-data",
      category: "Marine Mammals",
      status: "Endangered",
    },
  ];

  const ecosystems = [
    {
      title: "Mangrove Forests",
      desc: "Coastal nurseries of the sea",
      img: "images/bio1.png",
      details: "Mangroves provide habitat for many fish species.",
      datasetLink: "https://example.com/mangrove-data",
      category: "Mangroves",
      status: "Stable",
    },
    {
      title: "Kelp Forests",
      desc: "Underwater forests of the coast",
      img: "images/bio2.png",
      details: "Kelp forests support diverse marine life.",
      datasetLink: "https://example.com/kelp-data",
      category: "Ecosystems",
      status: "Stable",
    },
    {
      title: "Seagrass Beds",
      desc: "Submerged meadows of the ocean",
      img: "images/bio3.png",
      details: "Seagrasses stabilize sediments and support marine species.",
      datasetLink: "https://example.com/seagrass-data",
      category: "Mangroves",
      status: "Threatened",
    },
    {
      title: "Deep Sea Vents",
      desc: "Mysterious deep-sea habitats",
      img: "images/bio4.png",
      details: "Unique ecosystems supported by chemosynthetic bacteria.",
      datasetLink: "https://example.com/deep-sea-vents-data",
      category: "Deep Sea Creatures",
      status: "Stable",
    },
  ];

  // ---------- FILTER FUNCTION ----------
  const filterData = (data) => {
    return data.filter((item) => {
      const name = item.title || item.name || "";
      const category = item.category || "";
      const status = item.status || "";

      const matchesSearch = name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" || category === selectedCategory;

      const matchesStatus = selectedStatus === "All" || status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const filteredFeatured = filterData(featuredSpecies);
  const filteredMarine = filterData(marineSpecies);
  const filteredEcosystems = filterData(ecosystems);

  // ---------- RENDER ----------
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 min-h-screen">
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-12 py-8 md:py-12 max-w-[1600px] mx-auto">
        {/* Search & Filters */}
        <div className="fade-in mb-8">
          <div className="bg-background-light dark:bg-background-dark/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Search Box */}
              <div className="relative col-span-1 md:col-span-2">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  search
                </span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-background-dark border border-black-300 dark:border-black-600 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Search species, ecosystems..."
                  type="text"
                />
              </div>

              {/* Category Filter */}
              <div className="col-span-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option>All Categories</option>
                  <option>Marine Species</option>
                  <option>Ecosystems</option>
                  <option>Coral Reefs</option>
                  <option>Arthropods</option>
                  <option>Fishes</option>
                  <option>Sharks</option>
                  <option>Marine Mammals</option>
                  <option>Mangroves</option>
                  <option>Deep Sea Creatures</option>
                  <option>Jellies</option>
                  <option>Turtles</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="col-span-1">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="All">All Status</option>
                  <option value="Critically Endangered">Critically Endangered</option>
                  <option value="Endangered">Endangered</option>
                  <option value="Threatened">Threatened</option>
                  <option value="Stable">Stable</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Species */}
        <section className="fade-in">
          <h3 className="text-3xl font-bold text-white mb-8">Featured & Endangered Species</h3>
          {filteredFeatured.length === 0 ? (
            <p className="text-white text-center text-xl">No Featured Species Found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFeatured.map((species, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-xl shadow-lg bg-background-light dark:bg-background-dark/50 cursor-pointer"
                  onClick={() => openModal(species)}
                >
                  <img
                    src={species.image}
                    alt={species.title}
                    className="w-full h-64 md:h-80 object-cover rounded-t-xl"
                  />
                  <div className="p-6">
                    <span className={`absolute top-4 right-4 text-white text-xs font-bold px-2 py-1 rounded-full bg-${species.statusColor}/80`}>
                      {species.status}
                    </span>
                    <h4 className="text-2xl font-bold text-white mt-2 mb-2">{species.title}</h4>
                    <p className="text-white mb-4">{species.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ---------- Marine Species Grid ---------- */}
        <section className="fade-in mt-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Marine Species</h3>
          {filteredMarine.length === 0 ? (
            <p className="text-white text-center text-xl">No Marine Species Found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {filteredMarine.map((species, idx) => (
                <div
                  key={idx}
                  className="group text-center cursor-pointer"
                  onClick={() => openModal(species)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <div
                      className="aspect-square bg-cover bg-center rounded-lg transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url('${species.img}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h4 className="font-semibold text-white">{species.name}</h4>
                  <p className="text-sm text-white">{species.desc}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ---------- Ecosystems ---------- */}
        <section className="fade-in mt-16">
          <h3 className="text-4xl font-bold mb-8 text-white">Ecosystems</h3>
          {filteredEcosystems.length === 0 ? (
            <p className="text-white text-center text-xl">No Ecosystems Found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredEcosystems.map((eco, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl group cursor-pointer"
                  onClick={() => openModal(eco)}
                >
                  <img
                    src={eco.img}
                    alt={eco.title}
                    className="h-64 w-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
                    <h4 className="font-bold text-xl text-yellow-300">{eco.title}</h4>
                    <p className="text-gray-200">{eco.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ---------- Modal ---------- */}
      {isOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#161B22] p-6 rounded-xl max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-white text-2xl font-bold"
              onClick={closeModal}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-yellow-300 mb-2">{selectedItem.title || selectedItem.name}</h2>
            <img
              src={selectedItem.img || selectedItem.image}
              alt={selectedItem.title || selectedItem.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-white mb-4">
              {selectedItem.details || selectedItem.description || selectedItem.desc}
            </p>
            {selectedItem.datasetLink && (
             <button
  onClick={() => openSpeciesPage(selectedItem)}
  className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold"
>
  View Dataset / Research
</button>

            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BiodiversityPage;
