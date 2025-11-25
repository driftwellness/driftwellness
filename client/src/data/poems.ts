export type PoemMood = "calming" | "motivating" | "empowering" | "loving" | "mixed";

export interface Poem {
  id: number;
  title: string;
  content: string;
  mood: PoemMood;
  author: string;
}

export const poems: Poem[] = [
  // CALMING POEMS
  {
    id: 1,
    title: "Morning Stillness",
    content: `Breathe in the morning light,
Let go of yesterday's fight.
In this moment, you are whole,
Peace flows through your gentle soul.`,
    mood: "calming",
    author: "Drift",
  },
  {
    id: 2,
    title: "Ocean Whispers",
    content: `Like waves upon the shore,
Let worries wash away once more.
The tide will ebb, the tide will flow,
In nature's rhythm, find your glow.`,
    mood: "calming",
    author: "Drift",
  },
  {
    id: 3,
    title: "Quiet Mind",
    content: `Silence speaks in gentle tones,
A sanctuary for weary bones.
Release the noise, embrace the calm,
Your peace is like a healing balm.`,
    mood: "calming",
    author: "Drift",
  },
  {
    id: 4,
    title: "Soft Surrender",
    content: `Let your shoulders drop and fall,
Release the weight of it all.
In this breath, you're safe and free,
Wrapped in gentle serenity.`,
    mood: "calming",
    author: "Drift",
  },
  {
    id: 5,
    title: "Moonlit Peace",
    content: `Under silver moonlight's glow,
Let your racing heartbeat slow.
The night holds space for you to rest,
Tomorrow you'll give your best.`,
    mood: "calming",
    author: "Drift",
  },
  {
    id: 6,
    title: "Garden of Calm",
    content: `Like flowers in a quiet garden,
Your spirit softens, starts to pardon.
Each petal holds a moment's grace,
Find tranquility in this sacred space.`,
    mood: "calming",
    author: "Drift",
  },
  {
    id: 7,
    title: "Gentle River",
    content: `Flow like water, smooth and clear,
Release resistance, shed your fear.
The river knows just where to go,
Trust the current, let it flow.`,
    mood: "calming",
    author: "Drift",
  },
  {
    id: 8,
    title: "Cloud Watching",
    content: `Watch the clouds drift slowly by,
Across the canvas of the sky.
Like thoughts that come and gently pass,
Let worries fade like morning grass.`,
    mood: "calming",
    author: "Drift",
  },

  // MOTIVATING POEMS
  {
    id: 9,
    title: "Rise and Shine",
    content: `Rise like the sun, bold and bright,
Today you claim your inner might.
Each step forward, strong and true,
The world awaits what you will do.`,
    mood: "motivating",
    author: "Drift",
  },
  {
    id: 10,
    title: "Your Time is Now",
    content: `No more waiting for the perfect day,
Your moment is here, don't delay.
Take that step, make that call,
You have everything to give your all.`,
    mood: "motivating",
    author: "Drift",
  },
  {
    id: 11,
    title: "Mountain Climber",
    content: `Every mountain starts with one small stone,
Every journey begins alone.
But step by step, you'll reach the peak,
Find the strength you thought was weak.`,
    mood: "motivating",
    author: "Drift",
  },
  {
    id: 12,
    title: "Fire Within",
    content: `There's a fire burning deep inside,
A spark of passion you can't hide.
Fan the flames, let them grow,
Watch your inner brilliance glow.`,
    mood: "motivating",
    author: "Drift",
  },
  {
    id: 13,
    title: "Champion's Heart",
    content: `You're stronger than you've ever known,
Through every challenge you have grown.
Today's the day to show your power,
This is your defining hour.`,
    mood: "motivating",
    author: "Drift",
  },
  {
    id: 14,
    title: "Break Through",
    content: `Break through the walls that hold you back,
Get your dreams back on track.
No obstacle too high to climb,
Your victory is just a matter of time.`,
    mood: "motivating",
    author: "Drift",
  },
  {
    id: 15,
    title: "Warrior Spirit",
    content: `You're a warrior, fierce and brave,
Riding every crashing wave.
Stand tall, face the day with pride,
Let courage be your trusted guide.`,
    mood: "motivating",
    author: "Drift",
  },
  {
    id: 16,
    title: "Unstoppable",
    content: `Nothing can dim your shining light,
You're unstoppable in your fight.
Every setback is a setup for more,
Watch yourself rise and soar.`,
    mood: "motivating",
    author: "Drift",
  },

  // EMPOWERING POEMS
  {
    id: 17,
    title: "You Are Enough",
    content: `You are enough, just as you are,
A brilliant, shining, guiding star.
No need to prove, no need to hide,
Your worth comes from deep inside.`,
    mood: "empowering",
    author: "Drift",
  },
  {
    id: 18,
    title: "Own Your Power",
    content: `The power you seek is already yours,
It flows through you, it opens doors.
Stand in your truth, claim your space,
Move through the world with strength and grace.`,
    mood: "empowering",
    author: "Drift",
  },
  {
    id: 19,
    title: "Unbreakable",
    content: `You've weathered storms and survived the night,
Emerged with wisdom, emerged with might.
Unbreakable, resilient, strong,
You've had the power all along.`,
    mood: "empowering",
    author: "Drift",
  },
  {
    id: 20,
    title: "Queen of Your Life",
    content: `You're the queen of your own story,
Write it with courage, write it with glory.
No one else can walk your path,
Own your journey, own your wrath.`,
    mood: "empowering",
    author: "Drift",
  },
  {
    id: 21,
    title: "Voice of Truth",
    content: `Your voice matters, let it be heard,
Every thought, every powerful word.
Speak your truth without apology,
You're writing your own mythology.`,
    mood: "empowering",
    author: "Drift",
  },
  {
    id: 22,
    title: "Phoenix Rising",
    content: `From the ashes, you will rise,
Stronger, wiser, reaching skies.
Every ending births new light,
You're a phoenix taking flight.`,
    mood: "empowering",
    author: "Drift",
  },
  {
    id: 23,
    title: "Boundless",
    content: `You are boundless, wild, and free,
Limitless in what you can be.
Break the chains, spread your wings,
Your spirit soars, your heart sings.`,
    mood: "empowering",
    author: "Drift",
  },
  {
    id: 24,
    title: "Your Crown",
    content: `Adjust your crown and hold your head high,
You're meant to reach beyond the sky.
No one can take your power away,
You're magnificent every single day.`,
    mood: "empowering",
    author: "Drift",
  },

  // LOVING POEMS
  {
    id: 25,
    title: "Self-Love Song",
    content: `Be gentle with your tender heart,
You're a masterpiece, a work of art.
In your flaws, there's beauty too,
Love yourself the way you do.`,
    mood: "loving",
    author: "Drift",
  },
  {
    id: 26,
    title: "Embrace Yourself",
    content: `Wrap yourself in kindness today,
Let self-judgment fall away.
You deserve the love you freely give,
In compassion, truly live.`,
    mood: "loving",
    author: "Drift",
  },
  {
    id: 27,
    title: "Mirror of Grace",
    content: `Look in the mirror with loving eyes,
See the beauty that never dies.
Every scar tells of your strength,
You're perfect in your entire length.`,
    mood: "loving",
    author: "Drift",
  },
  {
    id: 28,
    title: "Worthy",
    content: `You are worthy of all good things,
Of joy and love and what life brings.
Don't settle for less than you deserve,
Honor yourself with every curve.`,
    mood: "loving",
    author: "Drift",
  },
  {
    id: 29,
    title: "Heart's Home",
    content: `Your heart is home, a sacred place,
Fill it with love and gentle grace.
Treat yourself like your best friend,
Love that has no start or end.`,
    mood: "loving",
    author: "Drift",
  },
  {
    id: 30,
    title: "Precious Soul",
    content: `You're a precious soul, unique and rare,
Handle yourself with tender care.
Speak to yourself with words so kind,
Peace and love are what you'll find.`,
    mood: "loving",
    author: "Drift",
  },
  {
    id: 31,
    title: "Garden of Self",
    content: `Tend to yourself like a garden in bloom,
Water your spirit, give yourself room.
Nurture your needs, honor your rest,
You deserve nothing but the best.`,
    mood: "loving",
    author: "Drift",
  },
  {
    id: 32,
    title: "Infinite Worth",
    content: `Your worth is not in what you do,
But in the simple fact you're you.
Love yourself unconditionally,
You're enough, eternally.`,
    mood: "loving",
    author: "Drift",
  },

  // MIXED/HEALING POEMS
  {
    id: 33,
    title: "This Too Shall Pass",
    content: `When storms arise and skies turn grey,
Remember: this too shall pass away.
You've weathered darkness, found your light,
Your spirit shines, forever bright.`,
    mood: "mixed",
    author: "Drift",
  },
  {
    id: 34,
    title: "New Beginnings",
    content: `Every ending is a chance to start,
To heal and mend your weary heart.
The past is gone, the future's clear,
Today is yours, so hold it dear.`,
    mood: "mixed",
    author: "Drift",
  },
  {
    id: 35,
    title: "Seasons Change",
    content: `Like seasons that shift and rearrange,
Your life is meant for constant change.
Winter's cold will turn to spring,
Trust the growth that time will bring.`,
    mood: "mixed",
    author: "Drift",
  },
  {
    id: 36,
    title: "Grateful Heart",
    content: `Count your blessings, big and small,
Gratitude will heal it all.
In every moment, find the grace,
Life's a gift, embrace its pace.`,
    mood: "mixed",
    author: "Drift",
  },
  {
    id: 37,
    title: "Present Moment",
    content: `The past is gone, the future's unclear,
But right now, you are here.
This moment is all you truly own,
In presence, you are never alone.`,
    mood: "mixed",
    author: "Drift",
  },
  {
    id: 38,
    title: "Journey On",
    content: `The path is long, the road is winding,
But keep on walking, keep on finding.
Every step brings you closer still,
To peace, to purpose, to your will.`,
    mood: "mixed",
    author: "Drift",
  },
  {
    id: 39,
    title: "Light and Shadow",
    content: `You need the dark to see the light,
The shadow makes the day more bright.
Embrace it all, the joy, the pain,
In sunshine and in gentle rain.`,
    mood: "mixed",
    author: "Drift",
  },
  {
    id: 40,
    title: "Your Story",
    content: `Your story isn't over yet,
There's so much more you haven't met.
Keep turning pages, chapter by chapter,
Your ending will be filled with laughter.`,
    mood: "mixed",
    author: "Drift",
  },
];

export function getPoemsByMood(mood: PoemMood): Poem[] {
  return poems.filter(poem => poem.mood === mood);
}

export function getRandomPoem(mood?: PoemMood): Poem {
  const filteredPoems = mood ? getPoemsByMood(mood) : poems;
  const randomIndex = Math.floor(Math.random() * filteredPoems.length);
  return filteredPoems[randomIndex];
}

export function getPoemById(id: number): Poem | undefined {
  return poems.find(poem => poem.id === id);
}
