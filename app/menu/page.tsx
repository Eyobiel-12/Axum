import MenuSection from "@/components/menu-section"

const menuCategories = {
  appetizers: {
    title: "Appetizers & Starters",
    items: [
      {
        name: "Samosa (ሳምቡሳ)",
        description:
          "Thin triangular dough stuffed with spiced vegetables and herbs or lentils, lightly deep fried until golden brown",
        price: "€5.00",
        dietary: ["V"],
        image: "/images/authentic-samosas.png",
        signature: false,
      },
      {
        name: "Vegetable Soup (የአትክልት ሾርባ)",
        description:
          "Traditional soup with onion, potatoes, carrots, cabbage, garlic, ginger, green pepper and rosemary",
        price: "€5.50",
        dietary: ["V", "GF"],
        image: "/images/authentic-vegetable-soup.png",
        signature: false,
      },
      {
        name: "Axum Special Salad (የአክሱም ሰላጣ)",
        description: "Crisp green salad topped with tomato, onion and green pepper in Axum's house dressing",
        price: "€6.50",
        dietary: ["V", "GF"],
        image: "/images/axum-special-salad-real.png",
        signature: true,
      },
      {
        name: "Yekey Sir Salad (የቀይ ስር ሰላጣ)",
        description: "Chopped red beetroot, carrots, potatoes, green pepper and onions in Axum's house dressing",
        price: "€7.00",
        dietary: ["V", "GF"],
        image: "/images/authentic-yekey-sir-salad.png",
        signature: false,
      },
    ],
  },
  chicken: {
    title: "Chicken Dishes (ዶሮ)",
    items: [
      {
        name: "Ye Doro Wot (የዶሮ ወጥ)",
        description: "Tender chicken drumstick in spicy berbere sauce with onions, garlic, ginger and hardboiled egg",
        price: "€18.00",
        dietary: ["GF"],
        image: "/images/ye-doro-wot-authentic.png",
        signature: true,
      },
      {
        name: "Ye Doro Alicha (የዶሮ አልጫ)",
        description: "Chicken drumstick in mild turmeric sauce with onions, garlic, ginger and hardboiled egg",
        price: "€18.50",
        dietary: ["GF"],
        image: "/images/ye-doro-alicha-authentic.png",
        signature: false,
      },
      {
        name: "Ye Doro Tibs (የዶሮ ጥብስ)",
        description: "Chunks of marinated chicken breast sautéed with onion, garlic and jalapeños",
        price: "€18.50",
        dietary: ["GF"],
        image: "/images/ye-doro-tibs-authentic.png",
        signature: false,
      },
    ],
  },
  beef: {
    title: "Beef Specialties (ሥጋ)",
    items: [
      {
        name: "Axum's Special Menu (አክሱም ልዩ ገበታ)",
        description:
          "Mixed platter of three meat and chicken dishes, served with five vegetable side dishes and ayib cheese",
        price: "€23.50",
        dietary: ["GF"],
        image: "/images/axum-special-menu-real.png",
        signature: true,
      },
      {
        name: "Key Wot (ቀይ ወጥ)",
        description: "Tender beef cubes simmered in rich berbere sauce with traditional Ethiopian spices",
        price: "€19.50",
        dietary: ["GF"],
        image: "/images/key-wot-real.png",
        signature: true,
      },
      {
        name: "Yeshekla Tibs (ሸክላ ጥብስ)",
        description:
          "Tender beef marinated with special sauce, sizzling with onion, rosemary, jalapeño and fresh garlic",
        price: "€23.00",
        dietary: ["GF"],
        image: "/images/yeshekla-tibs-real.png",
        signature: true,
      },
      {
        name: "Gored Gored (ጎረድ ጎረድ)",
        description: "Cubed tender beef marinated with purified herbed butter sauce and blended spicy pepper",
        price: "€22.50",
        dietary: ["GF"],
        image: "/images/gored-gored-real.png",
        signature: false,
      },
      {
        name: "Axum's Special Kitfo (የአክሱም ክትፎ)",
        description:
          "Ethiopian steak tartare seasoned with purified herbed butter sauce & mitmita spice, served with ayib cheese and gomen kitfo",
        price: "€22.50",
        dietary: ["GF"],
        image: "/images/kitfo-tartare-real.png",
        signature: true,
      },
    ],
  },
  lamb: {
    title: "Lamb Dishes (በግ)",
    items: [
      {
        name: "Ye Beg Tibs (የበግ ጥብስ)",
        description: "Succulent pieces of fresh lamb sautéed with onions, green pepper, tomato and rosemary",
        price: "€21.00",
        dietary: ["GF"],
        image: "/images/ye-beg-tibs-real.png",
        signature: false,
      },
      {
        name: "Awaze Tibs (የአዋዜ ጥብስ)",
        description:
          "Succulent pieces of fresh lamb sautéed with hot pepper, onions, green pepper, tomato and rosemary",
        price: "€21.00",
        dietary: ["GF"],
        image: "/images/awaze-tibs-updated-real.png",
        signature: false,
      },
      {
        name: "Gomen Besiga (ጎመን በሥጋ)",
        description: "Lamb cooked with kale, purified herbed butter, garlic, ginger, onions and green pepper",
        price: "€18.00",
        dietary: ["GF"],
        image: "/images/gomen-besiga-real.png",
        signature: false,
      },
      {
        name: "Alicha Siga Wot (የሥጋ አልጫ ወጥ)",
        description: "Lamb stew in mild purified herbed butter sauce with onion, garlic, ginger and turmeric",
        price: "€20.00",
        dietary: ["GF"],
        image: "/images/alicha-siga-wot-updated-real.png",
        signature: false,
      },
      {
        name: "Qey Siga Wot (የሥጋ ቀይ ወጥ)",
        description: "Hot and spicy lamb stew in hot and thick berbere sauce and purified herbed butter",
        price: "€20.00",
        dietary: ["GF"],
        image: "/images/qey-siga-wot-updated-real.png",
        signature: false,
      },
    ],
  },
  vegetarian: {
    title: "Vegetarian Dishes (የፆም ምግብ)",
    items: [
      {
        name: "Vegetarian Special (በያይነቱ)",
        description: "Pumpkin dish with red lentils, sesame, chickpeas, mixed vegetables, spinach and ayib cheese",
        price: "€20.50",
        dietary: ["V"],
        image: "/images/vegetarian-special-menu-real.png",
        signature: true,
      },
      {
        name: "Yeduba Wot (የዱባ ወጥ)",
        description:
          "Cooked South African pumpkin with Ethiopian spices, served with injera, ayib cheese, vegetables, lentils, beetroots and salad",
        price: "€17.00",
        dietary: ["V", "GF"],
        image: "/images/yeduba-wot-real.png",
        signature: false,
      },
      {
        name: "Tegamino (ተጋሚኖ)",
        description: "Roasted and powdered chickpeas (Shuro) simmered in our unique clay pot with mild berbere sauce",
        price: "€17.50",
        dietary: ["V", "GF"],
        image: "/images/tegamino-real.png",
        signature: false,
      },
      {
        name: "Yemisir Wot (የምስር ወጥ)",
        description: "Pureed red split lentils simmered in Axum's own spicy berbere sauce",
        price: "€15.50",
        dietary: ["V", "GF"],
        image: "/images/yemisir-wot-real.png",
        signature: false,
      },
      {
        name: "Kik Alicha (ክክ አልጫ)",
        description: "Yellow split peas cooked with turmeric, ginger, and mild spices",
        price: "€15.50",
        dietary: ["V", "GF"],
        image: "/images/kik-alicha-real.png",
        signature: false,
      },
      {
        name: "Gomen Wot (የጎመን ወጥ)",
        description: "Chopped collard greens simmered with onions, garlic, ginger and traditional Ethiopian spices",
        price: "€15.50",
        dietary: ["V", "GF"],
        image: "/images/gomen-real.png",
        signature: false,
      },
      {
        name: "Atakilt Wot (የአትክልት ወጥ)",
        description: "Cabbage, carrots and potatoes simmered with onions, garlic and ginger",
        price: "€16.00",
        dietary: ["V", "GF"],
        image: "/images/atakilt-wot-real.png",
        signature: false,
      },
    ],
  },
  beverages: {
    title: "Traditional Beverages",
    items: [
      {
        name: "Tej (ጠጅ)",
        description: "Traditional Ethiopian honey wine, homemade according to ancient recipes",
        price: "€6.00/glass • €19.00/bottle",
        dietary: ["V", "GF"],
        image: "/images/tej-honey-wine-real.png",
        signature: true,
      },
      {
        name: "Ethiopian Coffee Ceremony (የሐበሻ ቡና)",
        description:
          "Traditional three-round coffee ceremony prepared and served with full ceremony (for 4 persons). Please order an hour in advance.",
        price: "€25.00",
        dietary: ["V", "GF"],
        image: "/images/coffee-ceremony-real.png",
        signature: true,
      },
      {
        name: "Ethiopian Beer Selection",
        description:
          "Habesha and Bedele - authentic Ethiopian beers imported directly from Ethiopia, served with roasted barley snacks",
        price: "€5.00",
        dietary: ["V"],
        image: "/images/ethiopian-beer-real.png",
        signature: false,
      },
      {
        name: "Ethiopian Tea (የኢትዮጵያ ሻይ)",
        description: "Traditional Ethiopian tea blend with aromatic spices and herbs",
        price: "€4.00",
        dietary: ["V", "GF"],
        image: "/images/ethiopian-tea.jpg",
        signature: false,
      },
    ],
  },
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-900 to-amber-800 text-white py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">Our Authentic Menu</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-100 max-w-3xl mx-auto">
            Experience the rich flavors of traditional Ethiopian cuisine, prepared with authentic spices and
            time-honored recipes
          </p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <MenuSection category={menuCategories.appetizers.items} title={menuCategories.appetizers.title} />
        <MenuSection category={menuCategories.chicken.items} title={menuCategories.chicken.title} />
        <MenuSection category={menuCategories.beef.items} title={menuCategories.beef.title} />
        <MenuSection category={menuCategories.lamb.items} title={menuCategories.lamb.title} />
        <MenuSection category={menuCategories.vegetarian.items} title={menuCategories.vegetarian.title} />
        <MenuSection category={menuCategories.beverages.items} title={menuCategories.beverages.title} />
      </div>

      {/* Call to Action */}
      <div className="bg-amber-900 text-white py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
            Ready to Experience Authentic Ethiopian Cuisine?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-amber-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Book your table today and embark on a culinary journey to Ethiopia
          </p>
          <a
            href="/reservations"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors duration-300"
          >
            Make a Reservation
          </a>
        </div>
      </div>
    </div>
  )
}
