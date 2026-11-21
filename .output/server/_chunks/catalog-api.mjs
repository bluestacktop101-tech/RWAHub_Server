import fs from "node:fs";
import path from "node:path";
import { timingSafeEqual, randomUUID, createHmac } from "node:crypto";
import { fileURLToPath } from "node:url";
const assetsJson = [
  {
    id: "1",
    title: "Rolex Daytona 2023",
    description: "Limited edition Rolex Daytona with platinum case and ceramic bezel. Complete with original box and papers, purchase date January 2023.",
    category: "watches",
    status: "validated",
    imageUrl: "/assets/watches/rolex-daytona.jpg",
    images: [
      "/assets/watches/rolex-daytona.jpg"
    ],
    price: {
      amount: 3e4,
      currency: "USDT"
    },
    tokenization: {
      type: "fractional",
      totalTokens: 1e3,
      availableTokens: 750,
      pricePerToken: 30
    },
    listingType: "auction",
    isVerified: true,
    location: {
      address: "Geneva, Switzerland",
      city: "Geneva",
      country: "Switzerland"
    },
    specifications: {
      Brand: "Rolex",
      Model: "Daytona",
      "Reference Number": "116506",
      Movement: "Automatic",
      "Case Material": "Platinum",
      "Bracelet Material": "Platinum",
      Year: "2023",
      Condition: "Mint"
    },
    owner: {
      id: "user1",
      name: "John Smith",
      rating: 4.8
    },
    validation: {
      status: "validated",
      validatedBy: "validator1",
      validatedAt: "2024-01-15T00:00:00.000Z",
      comments: "Authentic Rolex Daytona with complete documentation."
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
    auctionEndTime: "2025-12-01T13:00:00Z",
    views: 1250,
    likes: 89,
    value: 3e4,
    tokenId: "12345"
  },
  {
    id: "2",
    title: "Abstract Composition #7",
    description: "Original canvas painting by emerging artist Maya Lin. Certificate of authenticity included.",
    category: "art",
    status: "validated",
    imageUrl: "/assets/art/abstract-1.jpg",
    images: [
      "/assets/art/abstract-1.jpg"
    ],
    price: {
      amount: 15e3,
      currency: "USDT"
    },
    tokenization: {
      type: "fractional",
      totalTokens: 500,
      availableTokens: 500,
      pricePerToken: 30
    },
    listingType: "fixed",
    isVerified: true,
    owner: {
      id: "user2",
      name: "Sarah Johnson",
      rating: 4.6
    },
    validation: {
      status: "validated",
      validatedBy: "validator2",
      validatedAt: "2024-01-10T00:00:00.000Z",
      comments: "Authentic artwork with proper provenance."
    },
    createdAt: "2024-01-05T00:00:00.000Z",
    updatedAt: "2024-01-10T00:00:00.000Z",
    views: 890,
    likes: 67,
    value: 15e3,
    tokenId: "12346"
  },
  {
    id: "3",
    title: 'First Edition "The Great Gatsby"',
    description: "First edition, first printing of F. Scott Fitzgerald's masterpiece, published in 1925. In good condition with original dust jacket.",
    category: "collectibles",
    status: "pending",
    imageUrl: "/assets/collectibles/baseball-cards.png",
    images: [
      "/assets/collectibles/baseball-cards.png"
    ],
    price: {
      amount: 7500,
      currency: "USDT"
    },
    tokenization: {
      type: "whole",
      totalTokens: 1,
      availableTokens: 1,
      pricePerToken: 7500
    },
    listingType: "fixed",
    isVerified: false,
    owner: {
      id: "user3",
      name: "Michael Brown",
      rating: 4.2
    },
    validation: {
      status: "pending"
    },
    createdAt: "2024-01-20T00:00:00.000Z",
    updatedAt: "2024-01-20T00:00:00.000Z",
    views: 234,
    likes: 12,
    value: 7500,
    tokenId: "12347"
  },
  {
    id: "4",
    title: "Diamond Necklace 18K Gold",
    description: "18K gold necklace with 3-carat total weight diamonds, GIA certified.",
    category: "jewelry",
    status: "validated",
    imageUrl: "/assets/jewelry/diamond-ring-1.jpg",
    images: [
      "/assets/jewelry/diamond-ring-1.jpg"
    ],
    price: {
      amount: 12e3,
      currency: "USDT"
    },
    tokenization: {
      type: "fractional",
      totalTokens: 400,
      availableTokens: 400,
      pricePerToken: 30
    },
    listingType: "auction",
    isVerified: true,
    owner: {
      id: "user4",
      name: "Emily Davis",
      rating: 4.9
    },
    validation: {
      status: "validated",
      validatedBy: "validator3",
      validatedAt: "2024-01-12T00:00:00.000Z",
      comments: "GIA certified diamonds with proper documentation."
    },
    createdAt: "2024-01-08T00:00:00.000Z",
    updatedAt: "2024-01-12T00:00:00.000Z",
    auctionEndTime: "2025-11-15T13:00:00Z",
    views: 567,
    likes: 45,
    value: 12e3,
    tokenId: "12348"
  },
  {
    id: "5",
    title: "Luxury Beachfront Villa",
    description: "Spectacular 5-bedroom beachfront villa in Malibu with direct ocean access, infinity pool, and smart home features.",
    category: "real-estate",
    status: "validated",
    imageUrl: "/assets/real-estate/villa-1.jpg.svg",
    images: [
      "/assets/real-estate/villa-1.jpg.svg"
    ],
    price: {
      amount: 25e5,
      currency: "USDT"
    },
    tokenization: {
      type: "fractional",
      totalTokens: 1e4,
      availableTokens: 1e4,
      pricePerToken: 250
    },
    listingType: "fixed",
    isVerified: true,
    location: {
      address: "123 Ocean Drive, Malibu, CA",
      city: "Malibu",
      country: "USA",
      coordinates: {
        lat: 34.0259,
        lng: -118.7798
      }
    },
    owner: {
      id: "user5",
      name: "Robert Wilson",
      rating: 4.7
    },
    validation: {
      status: "validated",
      validatedBy: "validator4",
      validatedAt: "2024-01-18T00:00:00.000Z",
      comments: "Property verified with proper title and valuation."
    },
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-01-18T00:00:00.000Z",
    views: 2100,
    likes: 156,
    value: 25e5,
    tokenId: "12349"
  }
];
const validatorsJson = [
  {
    id: "validator1",
    name: "Swiss Watch Authority",
    avatar: "/assets/hosted/pexels-614810.jpeg",
    expertise: [
      "watches"
    ],
    reputation: 4.9,
    jurisdiction: "Switzerland",
    validationCount: 287,
    verificationFee: {
      amount: 500,
      currency: "USDT"
    },
    availability: true,
    responseTime: "24-48 hours"
  },
  {
    id: "validator2",
    name: "Modern Art Verifiers",
    avatar: "/assets/hosted/pexels-220453.jpeg",
    expertise: [
      "art"
    ],
    reputation: 4.7,
    jurisdiction: "USA",
    validationCount: 153,
    verificationFee: {
      amount: 300,
      currency: "USDT"
    },
    availability: true,
    responseTime: "48-72 hours"
  },
  {
    id: "validator3",
    name: "Gem Certification Institute",
    avatar: "/assets/hosted/pexels-774909.jpeg",
    expertise: [
      "jewelry"
    ],
    reputation: 4.8,
    jurisdiction: "Global",
    validationCount: 412,
    verificationFee: {
      amount: 400,
      currency: "USDT"
    },
    availability: true,
    responseTime: "24-48 hours"
  },
  {
    id: "validator4",
    name: "Global Property Validators",
    avatar: "/assets/hosted/pexels-1222271.jpeg",
    expertise: [
      "real-estate"
    ],
    reputation: 4.6,
    jurisdiction: "International",
    validationCount: 89,
    verificationFee: {
      amount: 1e3,
      currency: "USDT"
    },
    availability: true,
    responseTime: "72-96 hours"
  },
  {
    id: "validator5",
    name: "Collectibles Authentication Board",
    avatar: "/assets/hosted/pexels-91227.jpeg",
    expertise: [
      "collectibles"
    ],
    reputation: 4.5,
    jurisdiction: "USA, EU",
    validationCount: 342,
    verificationFee: {
      amount: 200,
      currency: "USDT"
    },
    availability: true,
    responseTime: "48-72 hours"
  }
];
const usersJson = [
  {
    id: "user1",
    email: "john@example.com",
    name: "John Smith",
    avatar: "/assets/hosted/pexels-614810.jpeg",
    roles: [
      "seller"
    ],
    kyc: {
      status: "verified",
      documents: {
        idVerification: {
          id: "doc1",
          type: "id_verification",
          url: "/documents/user1/id.pdf",
          name: "ID Verification",
          verified: true,
          uploadedAt: "2024-01-01T00:00:00.000Z"
        }
      },
      verifiedAt: "2024-01-01T00:00:00.000Z"
    },
    wallet: {
      address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      balance: 5e4,
      currency: "USDT"
    },
    stats: {
      assetsListed: 3,
      assetsSold: 1,
      assetsBought: 0,
      totalValue: 45e3,
      rating: 4.8,
      reviews: 12
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-20T00:00:00.000Z"
  },
  {
    id: "demo-rwahub",
    email: "demo@rwahub.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    name: "Demo User",
    roles: [
      "buyer",
      "seller"
    ]
  },
  {
    id: "demo-frontend",
    email: "demo@example.com",
    password: "$2a$10$/Pc4IPXzHCG8cJUy9KAz/O09MnIz5e9zq3rrnDT3id1vLVGCrYN2m",
    name: "Demo User",
    roles: {
      isBuyer: true,
      isSeller: false
    },
    stats: {
      totalPurchases: 0,
      totalSales: 0
    }
  }
];
const transactionsJson = [
  {
    id: "t1",
    type: "buy",
    assetId: "1",
    amount: 18e4,
    status: "completed",
    date: "2024-01-15T00:00:00.000Z",
    from: "seller456",
    to: "user123"
  },
  {
    id: "t2",
    type: "tokenize",
    assetId: "2",
    amount: 15e3,
    status: "pending",
    date: "2024-02-01T00:00:00.000Z",
    from: "user123",
    to: "system"
  },
  {
    id: "t3",
    type: "validate",
    assetId: "3",
    amount: 45e3,
    status: "pending",
    date: "2024-01-25T00:00:00.000Z",
    from: "user123",
    to: "validator789"
  }
];
const validationsJson = [
  {
    id: "v1",
    assetId: "2",
    status: "pending",
    validatorId: "validator789",
    requestedAt: "2024-02-01T00:00:00.000Z",
    notes: "Awaiting authentication documents"
  },
  {
    id: "v2",
    assetId: "3",
    status: "action_required",
    validatorId: "validator456",
    requestedAt: "2024-01-25T00:00:00.000Z",
    notes: "Additional certification required"
  },
  {
    id: "v3",
    assetId: "5",
    status: "action_required",
    validatorId: "validator123",
    requestedAt: "2024-02-05T00:00:00.000Z",
    notes: "Condition report needed"
  }
];
const dashboardAssetsJson = [
  {
    id: "re1",
    title: "Luxury Downtown Penthouse",
    description: "Stunning 3-bedroom penthouse with panoramic city views, private elevator, and rooftop terrace",
    category: "real-estate",
    status: "validated",
    value: 35e5,
    imageUrl: "/assets/hosted/pexels-32870.jpg",
    createdAt: "2024-01-05T00:00:00.000Z",
    validatedAt: "2024-01-12T00:00:00.000Z",
    owner: {
      id: "user789",
      name: "Emma Thompson",
      rating: 4.8
    },
    tokenization: {
      type: "fractional",
      totalTokens: 1e3,
      availableTokens: 850,
      pricePerToken: 3500
    },
    updatedAt: "2024-01-05T00:00:00.000Z",
    views: 450,
    likes: 120,
    price: {
      amount: 35e5,
      currency: "USDT"
    },
    isVerified: true,
    listingType: "fixed"
  },
  {
    id: "re2",
    title: "Historic Vineyard Estate",
    description: "Magnificent 50-acre wine estate with main villa, guest house, and productive vineyard",
    category: "real-estate",
    status: "pending",
    value: 85e5,
    imageUrl: "/assets/hosted/pexels-442116.jpeg",
    createdAt: "2024-02-10T00:00:00.000Z",
    owner: {
      id: "user456",
      name: "Robert Wilson",
      rating: 4.6
    },
    tokenization: {
      type: "fractional",
      totalTokens: 2e3,
      availableTokens: 2e3,
      pricePerToken: 4250
    },
    updatedAt: "2024-02-10T00:00:00.000Z",
    views: 280,
    likes: 95,
    price: {
      amount: 85e5,
      currency: "USDT"
    },
    isVerified: false,
    listingType: "auction",
    auctionEndTime: "2024-04-10T00:00:00Z"
  },
  {
    id: "j1",
    title: "Art Deco Diamond Ring",
    description: "Exquisite 1920s platinum ring featuring a 3.5ct center diamond with sapphire accents",
    category: "jewelry",
    status: "validated",
    value: 85e3,
    imageUrl: "/assets/hosted/pexels-1191531.jpeg",
    createdAt: "2024-01-18T00:00:00.000Z",
    validatedAt: "2024-01-25T00:00:00.000Z",
    owner: {
      id: "user234",
      name: "Isabella Chen",
      rating: 4.9
    },
    tokenization: {
      type: "whole",
      totalTokens: 1,
      availableTokens: 1,
      pricePerToken: 85e3
    },
    updatedAt: "2024-01-18T00:00:00.000Z",
    views: 320,
    likes: 78,
    price: {
      amount: 85e3,
      currency: "USDT"
    },
    isVerified: true,
    listingType: "fixed"
  },
  {
    id: "j2",
    title: "Emerald and Pearl Tiara",
    description: "Royal collection piece featuring natural Colombian emeralds and South Sea pearls",
    category: "jewelry",
    status: "action_required",
    value: 125e3,
    imageUrl: "/assets/hosted/pexels-1457983.jpeg",
    createdAt: "2024-02-15T00:00:00.000Z",
    owner: {
      id: "user567",
      name: "Victoria Adams",
      rating: 4.7
    },
    tokenization: {
      type: "fractional",
      totalTokens: 100,
      availableTokens: 100,
      pricePerToken: 1250
    },
    updatedAt: "2024-02-15T00:00:00.000Z",
    views: 180,
    likes: 45,
    price: {
      amount: 125e3,
      currency: "USDT"
    },
    isVerified: false,
    listingType: "auction",
    auctionEndTime: "2024-03-15T00:00:00Z"
  },
  {
    id: "1",
    title: "Vintage Rolex Daytona",
    description: "Rare 1960s Rolex Daytona in excellent condition",
    category: "watches",
    status: "validated",
    value: 18e4,
    imageUrl: "/assets/hosted/pexels-190819.jpeg",
    createdAt: "2024-01-15T00:00:00.000Z",
    validatedAt: "2024-01-20T00:00:00.000Z",
    owner: {
      id: "user123",
      name: "John Doe",
      rating: 4.5
    },
    tokenization: {
      type: "whole",
      totalTokens: 1,
      availableTokens: 1,
      pricePerToken: 18e4
    },
    updatedAt: "2024-01-15T00:00:00.000Z",
    views: 250,
    likes: 45,
    price: {
      amount: 18e4,
      currency: "USDT"
    },
    isVerified: true,
    listingType: "fixed"
  },
  {
    id: "2",
    title: "Contemporary Abstract Painting",
    description: "Original artwork by emerging artist Sarah Chen",
    category: "art",
    status: "pending",
    value: 15e3,
    imageUrl: "/assets/hosted/pexels-1585325.jpeg",
    createdAt: "2024-02-01T00:00:00.000Z",
    owner: {
      id: "user123",
      name: "John Doe",
      rating: 4.5
    },
    tokenization: {
      type: "fractional",
      totalTokens: 100,
      availableTokens: 100,
      pricePerToken: 150
    },
    updatedAt: "2024-02-01T00:00:00.000Z",
    views: 75,
    likes: 20,
    price: {
      amount: 15e3,
      currency: "USDT"
    },
    isVerified: false,
    listingType: "auction",
    auctionEndTime: "2024-03-01T00:00:00Z"
  },
  {
    id: "3",
    title: "Sapphire and Diamond Necklace",
    description: "Vintage 18k gold necklace with natural sapphires",
    category: "jewelry",
    status: "action_required",
    value: 45e3,
    imageUrl: "/assets/hosted/pexels-1454171.jpeg",
    createdAt: "2024-01-25T00:00:00.000Z",
    owner: {
      id: "user123",
      name: "John Doe",
      rating: 4.5
    },
    tokenization: {
      type: "whole",
      totalTokens: 1,
      availableTokens: 1,
      pricePerToken: 45e3
    },
    updatedAt: "2024-01-25T00:00:00.000Z",
    views: 120,
    likes: 35,
    price: {
      amount: 45e3,
      currency: "USDT"
    },
    isVerified: false,
    listingType: "fixed"
  },
  {
    id: "4",
    title: "Luxury Beachfront Villa",
    description: "Modern 5-bedroom villa with private beach access",
    category: "real-estate",
    status: "validated",
    value: 25e5,
    imageUrl: "/assets/hosted/pexels-1396122.jpeg",
    createdAt: "2024-01-10T00:00:00.000Z",
    validatedAt: "2024-01-18T00:00:00.000Z",
    owner: {
      id: "user123",
      name: "John Doe",
      rating: 4.5
    },
    tokenization: {
      type: "fractional",
      totalTokens: 1e3,
      availableTokens: 1e3,
      pricePerToken: 2500
    },
    updatedAt: "2024-01-10T00:00:00.000Z",
    views: 300,
    likes: 85,
    price: {
      amount: 25e5,
      currency: "USDT"
    },
    isVerified: true,
    listingType: "fixed"
  },
  {
    id: "5",
    title: "Rare Baseball Card Collection",
    description: "Complete set of 1952 Topps cards",
    category: "collectibles",
    status: "action_required",
    value: 75e3,
    imageUrl: "/assets/hosted/pexels-1661950.jpeg",
    createdAt: "2024-02-05T00:00:00.000Z",
    owner: {
      id: "user123",
      name: "John Doe",
      rating: 4.5
    },
    tokenization: {
      type: "whole",
      totalTokens: 1,
      availableTokens: 1,
      pricePerToken: 75e3
    },
    updatedAt: "2024-02-05T00:00:00.000Z",
    views: 90,
    likes: 25,
    price: {
      amount: 75e3,
      currency: "USDT"
    },
    isVerified: false,
    listingType: "fixed"
  }
];
const marketplaceAssetsJson = [
  {
    id: "1",
    title: "Rolex Daytona 2023",
    category: "watches",
    price: {
      amount: 3e4,
      currency: "USDT"
    },
    imageUrl: "/assets/hosted/pexels-9978722.jpeg",
    isVerified: true,
    validator: "Swiss Watch Authority",
    description: "Limited edition Rolex Daytona with platinum case and ceramic bezel. Complete with original box and papers, purchase date January 2023.",
    ownerAddress: "0x1a2b3c...",
    tokenId: "12345",
    specifications: {
      Brand: "Rolex",
      Model: "Daytona",
      "Reference Number": "116506",
      Movement: "Automatic",
      "Case Material": "Platinum",
      "Bracelet Material": "Platinum",
      Year: "2023",
      Condition: "Mint"
    },
    listingType: "auction",
    auctionEndTime: "2025-12-01T13:00:00Z"
  },
  {
    id: "2",
    title: "Abstract Composition #7",
    category: "art",
    price: {
      amount: 15e3,
      currency: "USDT"
    },
    imageUrl: "/assets/hosted/pexels-1585325.jpeg",
    isVerified: true,
    validator: "Modern Art Verifiers",
    description: "Original canvas painting by emerging artist Maya Lin. Certificate of authenticity included.",
    listingType: "fixed"
  },
  {
    id: "3",
    title: 'First Edition "The Great Gatsby"',
    category: "collectibles",
    price: {
      amount: 7500,
      currency: "USDT"
    },
    imageUrl: "/assets/hosted/pexels-46274.jpeg",
    isVerified: false,
    description: "First edition, first printing of F. Scott Fitzgerald's masterpiece, published in 1925. In good condition with original dust jacket.",
    listingType: "fixed"
  },
  {
    id: "4",
    title: "Diamond Necklace 18K Gold",
    category: "jewelry",
    price: {
      amount: 12e3,
      currency: "USDT"
    },
    imageUrl: "/assets/hosted/pexels-1191531.jpeg",
    isVerified: true,
    validator: "Gem Certification Institute",
    description: "18K gold necklace with 3-carat total weight diamonds, GIA certified.",
    listingType: "auction",
    auctionEndTime: "2025-11-15T13:00:00Z"
  },
  {
    id: "5",
    title: "Patek Philippe Nautilus",
    category: "watches",
    price: {
      amount: 9e4,
      currency: "USDT"
    },
    imageUrl: "/assets/hosted/pexels-190819.jpeg",
    isVerified: true,
    validator: "Swiss Watch Authority",
    description: "Rare Patek Philippe Nautilus 5711 in stainless steel. Full set with box and papers.",
    listingType: "fixed"
  },
  {
    id: "6",
    title: "Luxury Beachfront Villa",
    category: "real-estate",
    price: {
      amount: 25e5,
      currency: "USDT"
    },
    imageUrl: "/assets/hosted/pexels-32870.jpg",
    isVerified: true,
    validator: "Global Property Validators",
    description: "Spectacular 5-bedroom beachfront villa in Malibu with direct ocean access, infinity pool, and smart home features.",
    listingType: "lend"
  },
  {
    id: "7",
    title: "Banksy Limited Print",
    category: "art",
    price: {
      amount: 45e3,
      currency: "USDT"
    },
    imageUrl: "/assets/hosted/pexels-20967.jpg",
    isVerified: true,
    validator: "Urban Art Authenticators",
    description: "Limited edition Banksy print, hand-numbered 23/150, with certificate of authenticity from Pest Control.",
    listingType: "swap"
  },
  {
    id: "8",
    title: "Vintage Porsche 911",
    category: "collectibles",
    price: {
      amount: 18e4,
      currency: "USDT"
    },
    imageUrl: "/assets/hosted/pexels-3136673.jpeg",
    isVerified: false,
    description: "1973 Porsche 911 Carrera RS in Gulf Blue. Numbers matching, documented history, recently restored.",
    listingType: "fixed"
  }
];
const extraValidatorsJson = [
  {
    id: "1",
    name: "Swiss Watch Authority",
    avatar: "/assets/hosted/pexels-614810.jpeg",
    expertise: [
      "watches"
    ],
    reputation: 4.9,
    jurisdiction: "Switzerland",
    validationCount: 287
  },
  {
    id: "2",
    name: "Modern Art Verifiers",
    avatar: "/assets/hosted/pexels-220453.jpeg",
    expertise: [
      "art"
    ],
    reputation: 4.7,
    jurisdiction: "USA",
    validationCount: 153
  },
  {
    id: "3",
    name: "Gem Certification Institute",
    avatar: "/assets/hosted/pexels-774909.jpeg",
    expertise: [
      "jewelry"
    ],
    reputation: 4.8,
    jurisdiction: "Global",
    validationCount: 412
  },
  {
    id: "4",
    name: "Global Property Validators",
    avatar: "/assets/hosted/pexels-1222271.jpeg",
    expertise: [
      "real-estate"
    ],
    reputation: 4.6,
    jurisdiction: "International",
    validationCount: 89
  },
  {
    id: "5",
    name: "Collectibles Authentication Board",
    avatar: "/assets/hosted/pexels-91227.jpeg",
    expertise: [
      "collectibles"
    ],
    reputation: 4.5,
    jurisdiction: "USA, EU",
    validationCount: 342
  },
  {
    id: "6",
    name: "Urban Art Authenticators",
    avatar: "/assets/hosted/pexels-1239291.jpeg",
    expertise: [
      "art"
    ],
    reputation: 4.9,
    jurisdiction: "UK",
    validationCount: 127
  },
  {
    id: "1",
    name: "John Anderson",
    expertise: [
      "watches",
      "jewelry"
    ],
    jurisdiction: "United States",
    validationCount: 156,
    reputation: 4.8,
    avatar: "/assets/hosted/unsplash-1472099645785-5658abf4ff4e.jpg",
    verificationFee: {
      amount: 500,
      currency: "USD"
    },
    availability: true,
    responseTime: "24-48 hours"
  },
  {
    id: "2",
    name: "Sarah Chen",
    expertise: [
      "art",
      "collectibles"
    ],
    jurisdiction: "Singapore",
    validationCount: 243,
    reputation: 4.9,
    avatar: "/assets/hosted/unsplash-1438761681033-6461ffad8d80.jpg",
    verificationFee: {
      amount: 750,
      currency: "USD"
    },
    availability: true,
    responseTime: "24 hours"
  },
  {
    id: "3",
    name: "Michael Roberts",
    expertise: [
      "real-estate"
    ],
    jurisdiction: "United Kingdom",
    validationCount: 89,
    reputation: 4.7,
    avatar: "/assets/hosted/unsplash-1500648767791-00dcc994a43e.jpg",
    verificationFee: {
      amount: 1200,
      currency: "USD"
    },
    availability: true,
    responseTime: "48-72 hours"
  },
  {
    id: "4",
    name: "Emily Thompson",
    expertise: [
      "jewelry",
      "art"
    ],
    jurisdiction: "Canada",
    validationCount: 167,
    reputation: 4.9,
    avatar: "/assets/hosted/unsplash-1494790108377-be9c29b29330.jpg",
    verificationFee: {
      amount: 600,
      currency: "USD"
    },
    availability: false,
    responseTime: "24-48 hours"
  },
  {
    id: "5",
    name: "David Kim",
    expertise: [
      "watches",
      "collectibles"
    ],
    jurisdiction: "South Korea",
    validationCount: 198,
    reputation: 4.8,
    avatar: "/assets/hosted/unsplash-1507003211169-0a1dd7228f2d.jpg",
    verificationFee: {
      amount: 550,
      currency: "USD"
    },
    availability: true,
    responseTime: "24 hours"
  },
  {
    id: "6",
    name: "Maria Garcia",
    expertise: [
      "art",
      "collectibles",
      "jewelry"
    ],
    jurisdiction: "Spain",
    validationCount: 134,
    reputation: 4.7,
    avatar: "/assets/hosted/unsplash-1487412720507-e7ab37603c6f.jpg",
    verificationFee: {
      amount: 650,
      currency: "USD"
    },
    availability: true,
    responseTime: "24-48 hours"
  }
];
const bundledLogs = [
  {
    name: "0e001c7b-1fea-4aaf-b6ea-4373955dda1d.log",
    label: "SERVER (0e001c7b-1fea-4aaf-b6ea-4373955dda1d)",
    lastSeen: "2026-11-16T20:53:27.253Z",
    text: "time: 2026-11-15T00:57:19.215Z\nevent: sync\nprojectRoot: D:\\Myproject\\Code_Project\\RWA_Project\\RWA_new\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n\ntime: 2026-11-15T01:15:25.461Z\nevent: sync\nprojectRoot: D:\\Myproject\\Code_Project\\RWA_Project\\RWA_new\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n\ntime: 2026-11-15T01:15:32.518Z\nevent: sync\nprojectRoot: D:\\Myproject\\Code_Project\\RWA_Project\\RWA_new\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n\ntime: 2026-11-15T01:37:22.547Z\npcName: SERVER\npcId: 0e001c7b-1fea-4aaf-b6ea-4373955dda1d\nrequestedAt: 2026-11-15T01:37:22.501Z\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n\ntime: 2026-11-15T01:38:54.267Z\npcName: SERVER\npcId: 0e001c7b-1fea-4aaf-b6ea-4373955dda1d\nprojectRoot: D:\\Myproject\\Code_Project\\RWA_Project\\RWA_new\nrequestedAt: 2026-11-15T01:38:54.214Z\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n\ntime: 2026-11-15T01:39:57.334Z\npcName: SERVER\npcId: 0e001c7b-1fea-4aaf-b6ea-4373955dda1d\nprojectRoot: D:\\Myproject\\Code_Project\\RWA_Project\\RWA_new\nrequestedAt: 2026-11-15T01:39:57.310Z\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n\ntime: 2026-11-15T01:40:12.240Z\npcName: SERVER\npcId: 0e001c7b-1fea-4aaf-b6ea-4373955dda1d\nprojectRoot: D:\\Myproject\\Code_Project\\RWA_Project\\RWA_new\nrequestedAt: 2026-11-15T01:40:12.216Z\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n\ntime: 2026-11-16T20:21:02.869Z\npcName: SERVER\npcId: 0e001c7b-1fea-4aaf-b6ea-4373955dda1d\nprojectRoot: D:\\Myproject\\Code_Project\\RWA_Project\\RWA_new\nrequestedAt: 2026-11-16T20:21:02.435Z\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n\ntime: 2026-11-16T20:22:26.224Z\npcName: SERVER\npcId: 0e001c7b-1fea-4aaf-b6ea-4373955dda1d\nprojectRoot: D:\\Myproject\\Code_Project\\RWA_Project\\RWA_new\nrequestedAt: 2026-11-16T20:22:25.968Z\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n\ntime: 2026-11-16T20:24:51.394Z\npcName: SERVER\npcId: 0e001c7b-1fea-4aaf-b6ea-4373955dda1d\nprojectRoot: D:\\Myproject\\Code_Project\\RWA_Project\\RWA_new\nrequestedAt: 2026-11-16T20:24:51.139Z\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n\ntime: 2026-11-16T20:46:13.599Z\npcName: SERVER\npcId: 0e001c7b-1fea-4aaf-b6ea-4373955dda1d\nprojectRoot: D:\\Myproject\\Code_Project\\RWA_Project\\RWA_new\nrequestedAt: 2026-11-16T20:46:13.327Z\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n\ntime: 2026-11-16T20:53:27.253Z\npcName: SERVER\npcId: 0e001c7b-1fea-4aaf-b6ea-4373955dda1d\nprojectRoot: D:\\Myproject\\Code_Project\\RWA_Project\\RWA_new\nrequestedAt: 2026-11-16T20:53:26.793Z\nassets: 5\nvalidators: 5\nusers: 3\ntransactions: 3\nvalidations: 3\ndashboardAssets: 9\nmarketplaceAssets: 8\nextraValidators: 12\n"
  }
];
const here = path.dirname(fileURLToPath(import.meta.url));
function projectRoot() {
  const candidates = [process.cwd(), path.resolve(here, "..")];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, "catalog", "assets.json"))) return dir;
  }
  return path.resolve(here, "..");
}
const root = projectRoot();
const catalogDir = path.join(root, "catalog");
const logsDir = path.join(root, "logs");
const publicBase = (process.env.PUBLIC_URL || "https://rwahubassets.com").replace(/\/$/, "");
function toPublicUrl(value) {
  if (typeof value !== "string") return value;
  if (value.startsWith("/assets/")) return `${publicBase}${value}`;
  return value;
}
function rewriteMedia(record) {
  if (!record || typeof record !== "object") return record;
  const next = { ...record };
  if (next.imageUrl) next.imageUrl = toPublicUrl(next.imageUrl);
  if (next.avatar) next.avatar = toPublicUrl(next.avatar);
  if (Array.isArray(next.images)) next.images = next.images.map(toPublicUrl);
  return next;
}
const bundledCatalog = {
  "assets.json": assetsJson,
  "validators.json": validatorsJson,
  "users.json": usersJson,
  "transactions.json": transactionsJson,
  "validations.json": validationsJson,
  "dashboard-assets.json": dashboardAssetsJson,
  "marketplace-assets.json": marketplaceAssetsJson,
  "extra-validators.json": extraValidatorsJson
};
function readList(name) {
  const filePath = path.join(catalogDir, name);
  if (fs.existsSync(filePath)) {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  }
  const bundled = bundledCatalog[name];
  return Array.isArray(bundled) ? bundled : [];
}
function writeList(name, records) {
  fs.mkdirSync(catalogDir, { recursive: true });
  fs.writeFileSync(path.join(catalogDir, name), JSON.stringify(records, null, 2));
}
function listAssets() {
  return readList("assets.json").map(rewriteMedia);
}
function getAsset(id) {
  return listAssets().find((asset) => asset.id === id) || null;
}
function createAsset(assetData) {
  const assets = listAssets();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const asset = {
    id: assetData.id || randomUUID(),
    ...assetData,
    createdAt: assetData.createdAt || now,
    updatedAt: now,
    views: assetData.views || 0,
    likes: assetData.likes || 0,
    status: assetData.status || "pending",
    isVerified: Boolean(assetData.isVerified)
  };
  assets.unshift(asset);
  writeList("assets.json", assets);
  return asset;
}
function updateAsset(id, updateData) {
  const assets = listAssets();
  const index = assets.findIndex((asset) => asset.id === id);
  if (index === -1) return null;
  const updated = { ...assets[index], ...updateData, id, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  assets[index] = updated;
  writeList("assets.json", assets);
  return updated;
}
function listUsers() {
  return readList("users.json");
}
function getUser(id) {
  return listUsers().find((user) => user.id === id) || null;
}
function saveUser(user) {
  const users = listUsers();
  const index = users.findIndex((item) => item.id === user.id);
  const saved = { ...user, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  if (index === -1) users.push(saved);
  else users[index] = { ...users[index], ...saved, id: user.id };
  writeList("users.json", users);
  return index === -1 ? saved : users[index];
}
function collectFileEntries(records) {
  const files = [];
  const seen = /* @__PURE__ */ new Set();
  for (const record of records) {
    const urls = [record.imageUrl, record.avatar, ...record.images || []];
    urls.forEach((url, index) => {
      if (typeof url !== "string" || !/^https?:\/\//.test(url) || seen.has(url)) return;
      seen.add(url);
      const id = record.id || "file";
      files.push({ url, relativePath: `uploads/assets/${id}-${index}.jpg` });
    });
  }
  return files;
}
function safeToken(value, fallback) {
  const cleaned = String(value || "").replace(/[^\w.-]/g, "").slice(0, 80);
  return cleaned || fallback;
}
async function appendPcLog(pcName, pcId, counts, requestedAt, projectPath) {
  const id = safeToken(pcId, "unknown");
  const name = String(pcName || "unknown").replace(/[\r\n]/g, " ").slice(0, 80);
  const time = (/* @__PURE__ */ new Date()).toISOString();
  const lines = [
    `time: ${time}`,
    `pcName: ${name}`,
    `pcId: ${id}`,
    `projectRoot: ${projectPath || ""}`,
    `requestedAt: ${requestedAt || ""}`,
    ...Object.entries(counts).map(([key, count]) => `${key}: ${count}`),
    ""
  ];
  const text = `${lines.join("\n")}
`;
  try {
    fs.mkdirSync(logsDir, { recursive: true });
    fs.appendFileSync(path.join(logsDir, `${id}.log`), text, "utf8");
    const indexPath = path.join(logsDir, "pcs.json");
    let index = [];
    if (fs.existsSync(indexPath)) {
      const parsed = JSON.parse(fs.readFileSync(indexPath, "utf8"));
      index = Array.isArray(parsed) ? parsed : [];
    }
    const existing = index.find((item) => item.pcId === id);
    if (existing) {
      existing.pcName = name;
      existing.lastSeen = time;
    } else {
      index.push({ pcId: id, pcName: name, lastSeen: time });
    }
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  } catch (error) {
    console.warn(`PC log file was not saved (${error.message})`);
  }
  const stamp = time.replace(/[:.]/g, "-");
  return {
    logDir: "log",
    logFile: `sync-${stamp}.log`,
    logText: text,
    pc: { pcId: id, pcName: name }
  };
}
async function buildSyncCatalog(pc = {}) {
  const assets = listAssets();
  const validators = readList("validators.json").map(rewriteMedia);
  const users = listUsers();
  const transactions = readList("transactions.json");
  const validations = readList("validations.json");
  const dashboardAssets = readList("dashboard-assets.json").map(rewriteMedia);
  const marketplaceAssets = readList("marketplace-assets.json").map(rewriteMedia);
  const extraValidators = readList("extra-validators.json").map(rewriteMedia);
  return {
    assets,
    validators,
    users,
    transactions,
    validations,
    dashboardAssets,
    marketplaceAssets,
    extraValidators,
    files: collectFileEntries([
      ...assets,
      ...validators,
      ...dashboardAssets,
      ...marketplaceAssets,
      ...extraValidators
    ]),
    cacheDir: "cache",
    ...await appendPcLog(pc.pcName, pc.pcId, {
      assets: assets.length,
      validators: validators.length,
      users: users.length,
      transactions: transactions.length,
      validations: validations.length,
      dashboardAssets: dashboardAssets.length,
      marketplaceAssets: marketplaceAssets.length,
      extraValidators: extraValidators.length
    }, pc.requestedAt, pc.projectRoot),
    meta: {
      version: "1",
      source: "rwahub-server",
      projectRoot: null
    }
  };
}
function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function readPcIndex() {
  const indexPath = path.join(logsDir, "pcs.json");
  if (!fs.existsSync(indexPath)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function adminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}
function adminCookieValue() {
  const password = adminPassword();
  if (!password) return "";
  return createHmac("sha256", password).update("rwahub-server-log").digest("hex");
}
function readCookie(cookieHeader, name) {
  const match = String(cookieHeader || "").match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : "";
}
function isAdmin(cookieHeader) {
  const expected = adminCookieValue();
  const actual = readCookie(cookieHeader, "rwahub_admin");
  if (!expected || !actual || expected.length !== actual.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(actual));
}
function readDiskLogs() {
  const index = readPcIndex();
  const files = fs.existsSync(logsDir) ? fs.readdirSync(logsDir).filter((name) => /^[\w.-]+\.log$/.test(name)) : [];
  return files.map((name) => {
    const pc = index.find((item) => `${item.pcId}.log` === name);
    return {
      name,
      label: pc ? `${pc.pcName} (${pc.pcId})` : name,
      lastSeen: pc?.lastSeen || "",
      text: fs.readFileSync(path.join(logsDir, name), "utf8")
    };
  });
}
async function readStoredLogs() {
  const logs = /* @__PURE__ */ new Map();
  for (const item of bundledLogs) {
    if (item?.name && /^[\w.-]+\.log$/.test(item.name)) logs.set(item.name, item);
  }
  for (const item of readDiskLogs()) {
    const current = logs.get(item.name);
    if (!current || item.text.length >= current.text.length) logs.set(item.name, item);
  }
  return [...logs.values()];
}
function passwordsMatch(input, expected) {
  const left = Buffer.from(String(input || ""));
  const right = Buffer.from(String(expected || ""));
  if (!right.length || left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
function renderLoginPage(message) {
  const note = message ? `<p class="error">${escapeHtml(message)}</p>` : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Admin log</title>
  <style>
    body { font-family: Segoe UI, sans-serif; margin: 2rem; color: #111; }
    form { display: grid; gap: 0.75rem; max-width: 320px; }
    input { padding: 0.5rem; }
    .error { color: #9b1c1c; }
  </style>
</head>
<body>
  <h1>Admin log</h1>
  ${note}
  <form method="post" action="/server-log/login">
    <label for="password">Admin password</label>
    <input id="password" name="password" type="password" autocomplete="current-password" required />
    <button type="submit">Open log</button>
  </form>
</body>
</html>`;
}
function pcNameFromLabel(label) {
  return String(label || "").replace(/\s*\([^)]*\)$/, "") || label;
}
async function renderServerLogPage(fileName) {
  const logs = await readStoredLogs();
  const selected = logs.find((item) => item.name === fileName);
  const links = logs.map((log) => {
    const active = selected && selected.name === log.name ? ' class="active"' : "";
    return `<a${active} href="/server-log/${encodeURIComponent(log.name)}">${escapeHtml(pcNameFromLabel(log.label))}</a>`;
  }).join("");
  let detail = '<p class="empty">Select a PC log.</p>';
  let summary = "Detail";
  if (fileName && (!/^[\w.-]+\.log$/.test(fileName) || !selected)) {
    summary = "Detail";
    detail = '<p class="empty">Log file not found.</p>';
  } else if (selected) {
    summary = escapeHtml(selected.label);
    const seen = selected.lastSeen ? `<p class="meta">${escapeHtml(selected.lastSeen)}</p>` : "";
    detail = `${seen}<pre>${escapeHtml(selected.text)}</pre>`;
  }
  const open = selected ? " open" : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Server log</title>
  <style>
    body { font-family: Segoe UI, sans-serif; margin: 0; color: #111; }
    h1 { margin: 0; padding: 1.25rem 1.5rem 0; }
    .layout { display: grid; grid-template-columns: 240px minmax(0, 1fr); min-height: calc(100vh - 4rem); }
    .pc-list { border-right: 1px solid #ddd; padding: 1rem 0; }
    .pc-list a { display: block; padding: 0.7rem 1.25rem; color: inherit; text-decoration: none; }
    .pc-list a.active { background: #e8f0fe; font-weight: 650; }
    .detail { padding: 1rem 1.5rem 2rem; }
    details { border: 1px solid #ddd; border-radius: 8px; background: #fff; }
    summary { cursor: pointer; padding: 0.8rem 1rem; font-weight: 650; }
    .meta { margin: 0; padding: 0 1rem; color: #555; font-size: 0.9rem; }
    pre { white-space: pre-wrap; background: #f4f4f4; margin: 0.75rem; padding: 1rem; border-radius: 8px; }
    .empty { margin: 0; padding: 0 1rem 1rem; color: #555; }
    @media (max-width: 720px) { .layout { grid-template-columns: 1fr; } .pc-list { border-right: 0; border-bottom: 1px solid #ddd; } }
  </style>
</head>
<body>
  <h1>Server log</h1>
  <div class="layout">
    <nav class="pc-list">${links || '<p class="empty">No logs yet.</p>'}</nav>
    <section class="detail">
      <details${open}>
        <summary>${summary}</summary>
        ${detail}
      </details>
    </section>
  </div>
</body>
</html>`;
}
function loginPassword(body) {
  if (body && typeof body === "object" && body.password) return String(body.password);
  if (typeof body === "string") return new URLSearchParams(body).get("password") || "";
  return "";
}
function adminSessionCookie() {
  return `rwahub_admin=${encodeURIComponent(adminCookieValue())}; HttpOnly; SameSite=Lax; Path=/; Max-Age=43200`;
}
async function handleCatalog(method, pathname, body = {}, request = {}) {
  const parts = pathname.split("/").filter(Boolean);
  const cookie = request.cookie || "";
  if (method === "POST" && pathname === "/server-log/login") {
    if (!adminPassword()) {
      return { status: 503, contentType: "text/html; charset=utf-8", body: renderLoginPage("Admin password is not configured on the server.") };
    }
    if (!passwordsMatch(loginPassword(body), adminPassword())) {
      return { status: 401, contentType: "text/html; charset=utf-8", body: renderLoginPage("Wrong password.") };
    }
    return {
      status: 303,
      contentType: "text/html; charset=utf-8",
      body: "",
      headers: { Location: "/server-log", "Set-Cookie": adminSessionCookie() }
    };
  }
  if (method === "GET" && (pathname === "/server-log" || parts[0] === "server-log" && parts.length === 2)) {
    if (!isAdmin(cookie)) {
      const message = adminPassword() ? "" : "Admin password is not configured on the server.";
      return { status: adminPassword() ? 401 : 503, contentType: "text/html; charset=utf-8", body: renderLoginPage(message) };
    }
    const fileName = parts.length === 2 ? decodeURIComponent(parts[1]) : "";
    return { status: 200, contentType: "text/html; charset=utf-8", body: await renderServerLogPage(fileName) };
  }
  if (method === "GET" && pathname === "/health") {
    return { status: 200, body: { status: "OK", service: "rwahub-server", timestamp: (/* @__PURE__ */ new Date()).toISOString() } };
  }
  if (method === "POST" && pathname === "/sync") {
    return { status: 200, body: await buildSyncCatalog(body || {}) };
  }
  if (parts[0] === "records" && parts[1] === "assets" && parts.length === 2) {
    if (method === "GET") return { status: 200, body: listAssets() };
    if (method === "POST") return { status: 201, body: createAsset(body || {}) };
  }
  if (parts[0] === "records" && parts[1] === "assets" && parts.length === 3) {
    const id = decodeURIComponent(parts[2]);
    if (method === "GET") {
      const asset = getAsset(id);
      return asset ? { status: 200, body: asset } : { status: 404, body: { error: "Asset not found" } };
    }
    if (method === "PATCH") {
      const asset = updateAsset(id, body || {});
      return asset ? { status: 200, body: asset } : { status: 404, body: { error: "Asset not found" } };
    }
  }
  if (parts[0] === "records" && parts[1] === "users" && parts.length === 2) {
    if (method === "GET") return { status: 200, body: listUsers() };
    if (method === "POST") {
      const user = body || {};
      if (!user.id || !user.email) return { status: 400, body: { error: "User id and email are required" } };
      return { status: 201, body: saveUser(user) };
    }
  }
  if (parts[0] === "records" && parts[1] === "users" && parts.length === 3) {
    const id = decodeURIComponent(parts[2]);
    if (method === "GET") {
      const user = getUser(id);
      return user ? { status: 200, body: user } : { status: 404, body: { error: "User not found" } };
    }
    if (method === "PATCH") {
      const existing = getUser(id);
      if (!existing) return { status: 404, body: { error: "User not found" } };
      return { status: 200, body: saveUser({ ...existing, ...body, id: existing.id, email: existing.email }) };
    }
  }
  return null;
}
export {
  handleCatalog as h
};
