exports.getRevenue = (req, res, next) => {
  res.render("revenue", {
    title: "Doanh thu"
  });
};

exports.getImport = (req, res, next) => {
  res.render("import-drug", {
    title: "Nhập thuốc"
  });
};

exports.getDrugList = (req, res, next) => {
  res.render("drug-list", {
    title: "Danh sách thuốc"
  });
};
