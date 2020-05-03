function replaceAll(text, search, replace) {
    let i = -1;
    let newText = text;
    do {
        text = newText;
        newText = text.replace(search, replace);
        i += 1;
    } while (newText !== text);
    return {text: newText, replaces: i};
}

function shuffle(text) {
    let parts = text.split('');
    for (let i = 0; i < parts.length; i++) {
        let pos = Math.floor(Math.random() * parts.length);
        let old = parts[i];
        parts[i] = parts[pos];
        parts[pos] = old;
    }
    return parts.join('');
}

const dictionary = "βΓΔδεζηθιΛλμνΞξΠπρΣσςτυΦφχΨψΩωБДЖꙀИЛЦЧШЩЪѢꙖѤЮѪѬѦѨѮѴҀՀՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռ϶⅁⅄⅋↑↓∀∃∄∅∇∌∜∯≢⊗⊞⊥⋈©®۞߶౿᧰℔℥℧⇪⌘⌦⎈⎇⎋⏏╗▚▣☂☆♫⚒⚑➰æƕƣȹȼɔɮɷჯᴚⰺⳣꮬ";

function compress(text) {
    let word_counts = {};
    for (let i = 15; i > 1; i--) {
        let word_re = new RegExp("\\w{" + i + "}", "g");
        do {
            m = word_re.exec(text);
            if (m) {
                word_counts[m[0]] |= 0;
                word_counts[m[0]] += 1;
            }
        } while (m);
    }

    word_counts = Object.entries(word_counts);
    word_counts = word_counts.filter(x => x[1] > 1);
    word_counts.sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)

    let my_dictionary = shuffle(dictionary);
    let dict_index = 0;
    let legend = "\n\n";
    word_counts.forEach(elem => {
        let word = elem[0];
        let letter = my_dictionary[dict_index];
        let replaced = replaceAll(text, word, letter);
        if (replaced.replaces) {
            text = replaced.text;
            legend += letter + " = " + word + "\n";
            dict_index += 1;
        }
    });

    return text + legend;
}
