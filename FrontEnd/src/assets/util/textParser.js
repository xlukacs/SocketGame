import * as emoji from '@/assets/js/emoji/emojis'
import * as tag from '@/assets/js/tag/tag'


export function convertToRaw(text) {
    text = emoji.convertToRaw(text);
    text = tag.convertToRaw(text);

    return text;
}

export function convertFromRaw(text, friendList) {
    text = emoji.convertFromRaw(text);
    text = tag.convertFromRaw(text , friendList);

    return text;
}