import { SPELLIT_ADDITIONAL_WORDS } from './spellitAdditionalWords';
import { SPELLIT_EXTRA_WORDS } from './spellitExtraWords';

export interface SpellitWord {
  id: string;
  word: string;
  meaning: string;
  meaningUrdu: string;
  synonyms: string[];
  antonyms?: string[];
}

const CORE_SPELLIT_WORDS: SpellitWord[] = [
  { id: 'abundant', word: 'Abundant', meaning: 'Existing in large quantities; plentiful.', meaningUrdu: 'وافر، بکثرت', synonyms: ['plentiful', 'ample'], antonyms: ['scarce'] },
  { id: 'admire', word: 'Admire', meaning: 'To regard someone or something with respect or approval.', meaningUrdu: 'تعریف کرنا، سراہنا', synonyms: ['respect', 'appreciate'], antonyms: ['disapprove'] },
  { id: 'ancient', word: 'Ancient', meaning: 'Belonging to the very distant past.', meaningUrdu: 'قدیم، پرانا', synonyms: ['old', 'antique'], antonyms: ['modern'] },
  { id: 'anxious', word: 'Anxious', meaning: 'Feeling worried or uneasy about something uncertain.', meaningUrdu: 'فکرمند، بے چین', synonyms: ['worried', 'uneasy'], antonyms: ['calm'] },
  { id: 'awkward', word: 'Awkward', meaning: 'Causing difficulty or embarrassment; not graceful.', meaningUrdu: 'بھدا، مشکل', synonyms: ['clumsy', 'uncomfortable'], antonyms: ['graceful'] },
  { id: 'barren', word: 'Barren', meaning: 'Too poor or dry to produce plants or crops.', meaningUrdu: 'بنجر، غیر زرخیز', synonyms: ['infertile', 'unproductive'], antonyms: ['fertile'] },
  { id: 'brisk', word: 'Brisk', meaning: 'Quick and energetic.', meaningUrdu: 'تیز، پھرتیلا', synonyms: ['swift', 'lively'], antonyms: ['slow'] },
  { id: 'cautious', word: 'Cautious', meaning: 'Careful to avoid danger or mistakes.', meaningUrdu: 'محتاط، ہوشیار', synonyms: ['careful', 'wary'], antonyms: ['careless'] },
  { id: 'combine', word: 'Combine', meaning: 'To join or bring things together.', meaningUrdu: 'ملانا، یکجا کرنا', synonyms: ['unite', 'merge'], antonyms: ['separate'] },
  { id: 'compassion', word: 'Compassion', meaning: 'Sympathy and concern for someone who is suffering.', meaningUrdu: 'ہمدردی، رحم دلی', synonyms: ['kindness', 'sympathy'], antonyms: ['cruelty'] },
  { id: 'conceal', word: 'Conceal', meaning: 'To keep something hidden.', meaningUrdu: 'چھپانا، پوشیدہ رکھنا', synonyms: ['hide', 'cover'], antonyms: ['reveal'] },
  { id: 'confident', word: 'Confident', meaning: 'Feeling sure about your abilities or decisions.', meaningUrdu: 'پراعتماد، پُریقین', synonyms: ['assured', 'certain'], antonyms: ['doubtful'] },
  { id: 'courteous', word: 'Courteous', meaning: 'Polite and respectful toward others.', meaningUrdu: 'مہذب، خوش اخلاق', synonyms: ['polite', 'civil'], antonyms: ['rude'] },
  { id: 'create', word: 'Create', meaning: 'To make something new.', meaningUrdu: 'تخلیق کرنا، بنانا', synonyms: ['make', 'produce'], antonyms: ['destroy'] },
  { id: 'curious', word: 'Curious', meaning: 'Eager to know or learn something.', meaningUrdu: 'متجسس، جاننے کا خواہش مند', synonyms: ['inquisitive', 'interested'], antonyms: ['indifferent'] },
  { id: 'decline', word: 'Decline', meaning: 'To become smaller, weaker, or less; to refuse politely.', meaningUrdu: 'کم ہونا، انکار کرنا', synonyms: ['decrease', 'refuse'], antonyms: ['increase', 'accept'] },
  { id: 'delicate', word: 'Delicate', meaning: 'Easily damaged or requiring careful handling.', meaningUrdu: 'نازک، لطیف', synonyms: ['fragile', 'tender'], antonyms: ['sturdy'] },
  { id: 'diligent', word: 'Diligent', meaning: 'Showing care and steady effort in your work.', meaningUrdu: 'محنتی، لگن والا', synonyms: ['hardworking', 'careful'], antonyms: ['lazy'] },
  { id: 'eager', word: 'Eager', meaning: 'Very interested and excited to do something.', meaningUrdu: 'بے تاب، مشتاق', synonyms: ['keen', 'enthusiastic'], antonyms: ['reluctant'] },
  { id: 'enormous', word: 'Enormous', meaning: 'Very large in size or amount.', meaningUrdu: 'بہت بڑا، عظیم', synonyms: ['huge', 'massive'], antonyms: ['tiny'] },
  { id: 'essential', word: 'Essential', meaning: 'Completely necessary or very important.', meaningUrdu: 'ضروری، لازمی', synonyms: ['necessary', 'vital'], antonyms: ['unnecessary'] },
  { id: 'fragile', word: 'Fragile', meaning: 'Easily broken or damaged.', meaningUrdu: 'نازک، جلد ٹوٹنے والا', synonyms: ['delicate', 'breakable'], antonyms: ['strong'] },
  { id: 'generous', word: 'Generous', meaning: 'Willing to give or share more than expected.', meaningUrdu: 'سخی، فیاض', synonyms: ['giving', 'charitable'], antonyms: ['selfish'] },
  { id: 'genuine', word: 'Genuine', meaning: 'Real and not false or imitation.', meaningUrdu: 'اصلی، حقیقی', synonyms: ['authentic', 'real'], antonyms: ['fake'] },
  { id: 'grateful', word: 'Grateful', meaning: 'Feeling or showing thanks.', meaningUrdu: 'شکرگزار، ممنون', synonyms: ['thankful', 'appreciative'], antonyms: ['ungrateful'] },
  { id: 'hesitate', word: 'Hesitate', meaning: 'To pause before doing or saying something because you are unsure.', meaningUrdu: 'ہچکچانا، جھجکنا', synonyms: ['pause', 'waver'], antonyms: ['proceed'] },
  { id: 'humble', word: 'Humble', meaning: 'Not thinking you are better than other people.', meaningUrdu: 'عاجز، منکسر المزاج', synonyms: ['modest', 'meek'], antonyms: ['arrogant'] },
  { id: 'imitate', word: 'Imitate', meaning: 'To copy the actions or appearance of someone or something.', meaningUrdu: 'نقل کرنا، مشابہت کرنا', synonyms: ['copy', 'mimic'], antonyms: ['originate'] },
  { id: 'inspire', word: 'Inspire', meaning: 'To encourage someone to feel or do something creative or positive.', meaningUrdu: 'حوصلہ دینا، ترغیب دینا', synonyms: ['encourage', 'motivate'], antonyms: ['discourage'] },
  { id: 'journey', word: 'Journey', meaning: 'The act of travelling from one place to another.', meaningUrdu: 'سفر، مسافت', synonyms: ['trip', 'voyage'], antonyms: [] },
  { id: 'knowledge', word: 'Knowledge', meaning: 'Information and understanding gained through learning or experience.', meaningUrdu: 'علم، معلومات', synonyms: ['understanding', 'learning'], antonyms: ['ignorance'] },
  { id: 'modest', word: 'Modest', meaning: 'Not boastful; moderate in size or amount.', meaningUrdu: 'منکسر المزاج، معمولی', synonyms: ['humble', 'simple'], antonyms: ['boastful'] },
  { id: 'mysterious', word: 'Mysterious', meaning: 'Difficult to understand or explain.', meaningUrdu: 'پُراسرار، راز بھرا', synonyms: ['strange', 'enigmatic'], antonyms: ['obvious'] },
  { id: 'narrow', word: 'Narrow', meaning: 'Small in width; not wide.', meaningUrdu: 'تنگ، کم چوڑا', synonyms: ['slim', 'tight'], antonyms: ['wide'] },
  { id: 'observe', word: 'Observe', meaning: 'To watch carefully or notice something.', meaningUrdu: 'مشاہدہ کرنا، غور کرنا', synonyms: ['notice', 'watch'], antonyms: ['ignore'] },
  { id: 'patient', word: 'Patient', meaning: 'Able to wait calmly without becoming upset.', meaningUrdu: 'صابر، تحمل والا', synonyms: ['calm', 'tolerant'], antonyms: ['impatient'] },
  { id: 'precious', word: 'Precious', meaning: 'Very valuable or important.', meaningUrdu: 'قیمتی، عزیز', synonyms: ['valuable', 'treasured'], antonyms: ['worthless'] },
  { id: 'predict', word: 'Predict', meaning: 'To say what you think will happen in the future.', meaningUrdu: 'پیش گوئی کرنا', synonyms: ['forecast', 'foretell'], antonyms: [] },
  { id: 'protect', word: 'Protect', meaning: 'To keep someone or something safe from harm.', meaningUrdu: 'حفاظت کرنا، بچانا', synonyms: ['guard', 'defend'], antonyms: ['endanger'] },
  { id: 'rare', word: 'Rare', meaning: 'Not common or not often found.', meaningUrdu: 'نایاب، کم یاب', synonyms: ['uncommon', 'scarce'], antonyms: ['common'] },
  { id: 'reluctant', word: 'Reluctant', meaning: 'Not willing or eager to do something.', meaningUrdu: 'ہچکچانے والا، ناخوش', synonyms: ['unwilling', 'hesitant'], antonyms: ['eager'] },
  { id: 'remarkable', word: 'Remarkable', meaning: 'Unusual or impressive enough to be noticed.', meaningUrdu: 'قابلِ ذکر، غیر معمولی', synonyms: ['impressive', 'exceptional'], antonyms: ['ordinary'] },
  { id: 'resist', word: 'Resist', meaning: 'To oppose or try not to give in to something.', meaningUrdu: 'مزاحمت کرنا، روکنا', synonyms: ['oppose', 'withstand'], antonyms: ['yield'] },
  { id: 'scarce', word: 'Scarce', meaning: 'Available only in small amounts.', meaningUrdu: 'کمیاب، نایاب', synonyms: ['rare', 'limited'], antonyms: ['abundant'] },
  { id: 'swift', word: 'Swift', meaning: 'Moving or happening very quickly.', meaningUrdu: 'تیز، جلد', synonyms: ['fast', 'rapid'], antonyms: ['slow'] },
  { id: 'thrive', word: 'Thrive', meaning: 'To grow, develop, or succeed well.', meaningUrdu: 'ترقی کرنا، پھلنا پھولنا', synonyms: ['flourish', 'prosper'], antonyms: ['decline'] },
  { id: 'timid', word: 'Timid', meaning: 'Shy and easily frightened.', meaningUrdu: 'ڈرپوک، شرمیلا', synonyms: ['shy', 'fearful'], antonyms: ['bold'] },
  { id: 'unique', word: 'Unique', meaning: 'Being the only one of its kind.', meaningUrdu: 'منفرد، یکتا', synonyms: ['distinctive', 'one-of-a-kind'], antonyms: ['common'] },
  { id: 'vacant', word: 'Vacant', meaning: 'Not occupied or being used.', meaningUrdu: 'خالی، غیر آباد', synonyms: ['empty', 'unoccupied'], antonyms: ['occupied'] },
  { id: 'vivid', word: 'Vivid', meaning: 'Producing strong, clear images or feelings.', meaningUrdu: 'شوخ، واضح', synonyms: ['bright', 'lively'], antonyms: ['dull'] },
  { id: 'weary', word: 'Weary', meaning: 'Very tired, especially after much effort.', meaningUrdu: 'تھکا ہوا، ماندہ', synonyms: ['tired', 'exhausted'], antonyms: ['energetic'] },
  { id: 'wise', word: 'Wise', meaning: 'Having good judgment and knowledge from experience.', meaningUrdu: 'دانشمند، عقل مند', synonyms: ['sensible', 'prudent'], antonyms: ['foolish'] },
  { id: 'witness', word: 'Witness', meaning: 'To see an event happen; a person who sees it happen.', meaningUrdu: 'گواہ ہونا، عینی شاہد', synonyms: ['observe', 'see'], antonyms: [] },
  { id: 'worthwhile', word: 'Worthwhile', meaning: 'Worth the time, effort, or money spent.', meaningUrdu: 'قابلِ قدر، فائدہ مند', synonyms: ['valuable', 'beneficial'], antonyms: ['pointless'] },
  { id: 'yield', word: 'Yield', meaning: 'To give way or produce a result or crop.', meaningUrdu: 'راستہ دینا، پیداوار دینا', synonyms: ['surrender', 'produce'], antonyms: ['resist'] },
];

export const SPELLIT_WORDS: SpellitWord[] = [
  ...CORE_SPELLIT_WORDS,
  ...SPELLIT_ADDITIONAL_WORDS,
  ...SPELLIT_EXTRA_WORDS,
];
