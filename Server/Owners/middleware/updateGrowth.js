const client = require("../../db");

const getGrowth = async (req, res, next) => {
    try {
      let totalInfrastructure = 0;
      let totalRawMaterials = 0;
      let totalMachinery = 0;
  
      const infrastructureQuery = client.query(
        `SELECT total FROM infrastructure where uid = ${req.query.uid}`
      );
      const rawMaterialsQuery = client.query(
        `SELECT total FROM rawMaterials where uid = ${req.query.uid}`
      );
      const machineryQuery = client.query(
        `SELECT total FROM machinery where uid = ${req.query.uid}`
      );
  
      const [infrastructureResult, rawMaterialsResult, machineryResult] =
        await Promise.all([
          infrastructureQuery,
          rawMaterialsQuery,
          machineryQuery,
        ]);
  
      infrastructureResult.rows.forEach((row) => {
        totalInfrastructure += row.total;
      });
  
      rawMaterialsResult.rows.forEach((row) => {
        totalRawMaterials += row.total;
      });
  
      machineryResult.rows.forEach((row) => {
        totalMachinery += row.total;
      });
  
      const netInvestment =
        totalInfrastructure + totalRawMaterials + totalMachinery;
      const netProfit = -netInvestment;
  
      await client.query(
        "UPDATE owners SET netinvestment = $1, netprofit = $2 WHERE id = $3",
        [netInvestment, netProfit, req.query.uid]
      );
  
      res.json({
        netInvestment: netInvestment,
        netProfit: netProfit,
      });
    } catch (err) {
      console.error("Error executing query", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

module.exports = { getGrowth };
