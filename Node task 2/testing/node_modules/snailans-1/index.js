module.exports = {
    generateRandomNumber: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    generateRandomName: function() {
        const names = ["John", "Jane", "Sam", "Sue"];
        return names[Math.floor(Math.random() * names.length)];
    }
};
