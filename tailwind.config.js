module.exports = {
    content: [],
    theme: {
        extend: {
            animation: {
                'rightToLeft': ' rightToLeft 10s infinite linear ',
            },
            keyframes: {
                rightToLeft: {
                    '0%, 100%': { transform: 'translateX(0%)' },
                    '50%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}