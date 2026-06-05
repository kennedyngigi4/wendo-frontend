export const extractSearchKeywords = (text: string) => {

    let cleaned = text.toLowerCase();

    // Remove common filler words
    const stopWords = [
        "i",
        "need",
        "want",
        "looking",
        "for",
        "find",
        "me",
        "a",
        "an",
        "the",
        "please",
        "show",
    ];

    cleaned = cleaned
        .split(" ")
        .filter(word => !stopWords.includes(word))
        .join(" ");

    // Synonyms mapping
    const synonyms: Record<string, string> = {
        "heart doctor": "cardiologist",
        "skin doctor": "dermatologist",
        "eye doctor": "ophthalmologist",
        "children doctor": "pediatrician",
        "children hospital": "pediatric hospital",
    };

    Object.entries(synonyms).forEach(([key, value]) => {
        if (cleaned.includes(key)) {
            cleaned = value;
        }
    });

    return cleaned.trim();
};