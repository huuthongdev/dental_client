export default class ShortKeyService {
    static esc(action) {
        return document.onkeyup = (e) => {
            if (e.which === 27) return action();
        }
    }
}