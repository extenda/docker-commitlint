module.exports = {
    rules: {
        'format': (parsed, when) => {
            if (!parsed.header) {
                return [true];
            }
            const header = parsed.header.toLowerCase();
            const regexp = /^\b(?:feat|fix|chore|docs|style|refactor|perf|test|build|ci|other)\b\((\w+-\d+)\)[!?]?:\s\S.*$/;
            const success = regexp.test(header);
            return [success, "Use the correct format in the header, e.g 'feat(ABC-123): Title'"];
        }
    }
};
