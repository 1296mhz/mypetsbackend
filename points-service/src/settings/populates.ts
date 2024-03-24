const populates = {
  district: {
    action: "districts.get",
    params: {
      fields: ["_id", "name", "description", "rating"]
    }
  }
};

export default populates;