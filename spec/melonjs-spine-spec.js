describe("me.Spine.Entity", function() {
  var entity;

  describe("#init", function() {
    it("should throw an error when missing the required settings", function() {
      expect(function() { new me.Spine.Entity() }).toThrow("Ensure atlas, imagePath and spineData are specified in the settings hash");
    });
  });
});