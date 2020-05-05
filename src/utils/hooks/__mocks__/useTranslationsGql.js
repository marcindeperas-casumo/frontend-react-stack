export const useTranslationsGql = (translations) => {
    return {
        loading: false,
        t: Object.keys(translations).reduce((acc, current) => ({ ...acc, [current]: current}), {})
    };
};