module.exports = () => ({
  autoDetect: true,
});
module.exports = function (wallaby) {
  return {
    files: ["src/**/*.js"],

    tests: ["test/**/*Spec.js"],

    env: {
      type: "node",
    },
  };
};
