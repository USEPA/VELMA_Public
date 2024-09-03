const express = require('express');
const pug = require('pug')
const path = require('path');
const app = express()
const port = 3000


app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'docs', 'public')))
//app.use('docs', 'views')

app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Home' })
})

app.get('/intro', (req, res) => {
    res.render('intro', { pageTitle: 'Intro' })
  })

app.get('/changes', (req, res) => {
  res.render('changes', { pageTitle: 'Changes from VELMA 1.0'})
})

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About this Manual'})
})

app.get('/input_files', (req, res) => {
  res.render('input_files', { pageTitle: 'Input Files'})
})

// app.get('/file-details', (req, res) => {
//   res.render('input_files_details', { pageTitle: 'Input File Details'})
// })

app.get('/new_sim_config', (req, res) => {
  res.render('new_sim_config', { pageTitle: 'New Sim Config'})
})

app.get('/parameter_config', (req, res) => {
  res.render('parameter_config', { pageTitle: 'Parameter Config'})
})

app.get('/appendix_1', (req, res) => {
  res.render('appendix_1', { pageTitle: 'Appendix 1'})
})

app.get('/appendix_2', (req, res) => {
  res.render('appendix_2', { pageTitle: 'Appendix 2'})
})

app.get('/appendix_3', (req, res) => {
  res.render('appendix_3', { pageTitle: 'Appendix 3'})
})

app.get('/appendix_4', (req, res) => {
  res.render('appendix_4', { pageTitle: 'Appendix 4'})
})

app.get('/appendix_5', (req, res) => {
  res.render('appendix_5', { pageTitle: 'Appendix 5'})
})

app.get('/appendix_6', (req, res) => {
  res.render('appendix_6', { pageTitle: 'Appendix 6'})
})

app.get('/appendix_7', (req, res) => {
  res.render('appendix_7', { pageTitle: 'Appendix 7'})
})

app.get('/supplement-a1', (req, res) => {
  res.render('supplement-a1', { pageTitle: 'Supplement A1'})
})

app.get('/supplement-a2', (req, res) => {
  res.render('supplement-a2', { pageTitle: 'Supplement a2'})
})

app.get('/supplement-a3', (req, res) => {
  res.render('supplement-a3', { pageTitle: 'Supplement a3'})
})

app.get('/supplement-a4', (req, res) => {
  res.render('supplement-a4', { pageTitle: 'Supplement a4'})
})

app.get('/supplement-b1', (req, res) => {
  res.render('supplement-b1', { pageTitle: 'Supplement b1'})
})

app.get('/supplement-b2', (req, res) => {
  res.render('supplement-b2', { pageTitle: 'Supplement b2'})
})

app.get('/supplement-b3', (req, res) => {
  res.render('supplement-b3', { pageTitle: 'Supplement b3'})
})

app.get('/supplement-b4', (req, res) => {
  res.render('supplement-b4', { pageTitle: 'Supplement b4'})
})

app.get('/supplement-b5', (req, res) => {
  res.render('supplement-b5', { pageTitle: 'Supplement b5'})
})

app.get('/supplement-b6', (req, res) => {
  res.render('supplement-b6', { pageTitle: 'Supplement b6'})
})

app.get('/supplement-b7', (req, res) => {
  res.render('supplement-b7', { pageTitle: 'Supplement b7'})
})

app.get('/supplement-b8', (req, res) => {
  res.render('supplement-b8', { pageTitle: 'Supplement b8'})
})

app.get('/supplement-b9', (req, res) => {
  res.render('supplement-b9', { pageTitle: 'Supplement b9'})
})

app.get('/supplement-b10', (req, res) => {
  res.render('supplement-b10', { pageTitle: 'Supplement b10'})
})

app.get('/supplement-c1', (req, res) => {
  res.render('supplement-c1', { pageTitle: 'Supplement c1'})
})

app.get('/supplement-c2', (req, res) => {
  res.render('supplement-c2', { pageTitle: 'Supplement c2'})
})

app.get('/supplement-c3', (req, res) => {
  res.render('supplement-c3', { pageTitle: 'Supplement c3'})
})

app.get('/supplement-d1', (req, res) => {
  res.render('supplement-d1', { pageTitle: 'Supplement d1'})
})

app.get('/supplement-d2', (req, res) => {
  res.render('supplement-d2', { pageTitle: 'Supplement d2'})
})

app.get('/supplement-d3', (req, res) => {
  res.render('supplement-d3', { pageTitle: 'Supplement d3'})
})

app.get('/supplement-d4', (req, res) => {
  res.render('supplement-d4', { pageTitle: 'Supplement d4'})
})

app.get('/supplement-d5', (req, res) => {
  res.render('supplement-d5', { pageTitle: 'Supplement d5'})
})

app.get('/supplement-d6', (req, res) => {
  res.render('supplement-d6', { pageTitle: 'Supplement d6'})
})

app.get('/supplement-d7a', (req, res) => {
  res.render('supplement-d7a', { pageTitle: 'Supplement d7a'})
})

app.get('/supplement-d7b', (req, res) => {
  res.render('supplement-d7b', { pageTitle: 'Supplement d7b'})
})

app.get('/supplement-d8', (req, res) => {
  res.render('supplement-d8', { pageTitle: 'Supplement d8'})
})

app.get('/supplement-d9', (req, res) => {
  res.render('supplement-d9', { pageTitle: 'Supplement d9'})
})

app.get('/supplement-d10', (req, res) => {
  res.render('supplement-d10', { pageTitle: 'Supplement d10'})
})

app.get('/supplement-e1', (req, res) => {
  res.render('supplement-e1', { pageTitle: 'Supplement e1'})
})

app.get('/supplement-e2', (req, res) => {
  res.render('supplement-e2', { pageTitle: 'Supplement e2'})
})

app.get('/supplement-e3', (req, res) => {
  res.render('supplement-e3', { pageTitle: 'Supplement e3'})
})

app.get('/supplement-e4', (req, res) => {
  res.render('supplement-e4', { pageTitle: 'Supplement e4'})
})

app.get('/supplement-e5', (req, res) => {
  res.render('supplement-e5', { pageTitle: 'Supplement e5'})
})


app.get('/supplement-e6', (req, res) => {
  res.render('supplement-e6', { pageTitle: 'Supplement e6'})
})

app.get('/supplement-e7', (req, res) => {
  res.render('supplement-e7', { pageTitle: 'Supplement e7'})
})

app.get('/dev_info', (req, res) => {
  res.render('dev_info', { pageTitle: 'Dev Info'})
})

app.get('/GetVelma_ForEclipse', (req, res) => {
  res.render('GetVelma_ForEclipse', { pageTitle: 'Get Velma For Eclipse'})
})

app.get('/CellSpecificBurnDisturbance_Configuration_Guide', (req, res) => {
  res.render('CellSpecificBurnDisturbance_Configuration_Guide', { pageTitle: 'Cell Specific Burn Disturbance Configuration Guide'})
})

app.get('/Configuration_Checker_Guide', (req, res) => {
  res.render('Configuration_Checker_Guide', { pageTitle: 'Configuration Checker Guide'})
})

app.get('/DefaultSedimentModel_Configuration_Guide', (req, res) => {
  res.render('DefaultSedimentModel_Configuration_Guide', { pageTitle: 'Default Sediment Model Configuration Guide'})
})

app.get('/ForestBurnLsrDisturbanceModel_Overview', (req, res) => {
  res.render('ForestBurnLsrDisturbanceModel_Overview', { pageTitle: 'ForestBurnLsrDisturbanceModel_Overview'})
})

app.get('/JPDEM_ReachMapping_Demonstration', (req, res) => {
  res.render('JPDEM_ReachMapping_Demonstration', { pageTitle: 'JPDEM_ReachMapping_Demonstration'})
})

app.get('/MinMaxAirT_WeatherDrivers', (req, res) => {
  res.render('MinMaxAirT_WeatherDrivers', { pageTitle: 'MinMaxAirT_WeatherDrivers'})
})

app.get('/ModifySpatialDataByMap_Guide', (req, res) => {
  res.render('ModifySpatialDataByMap_Guide', { pageTitle: 'ModifySpatialDataByMap_Guide'})
})

app.get('/ObsRunoff_and_NaNs', (req, res) => {
  res.render('ObsRunoff_and_NaNs', { pageTitle: 'ObsRunoff_and_NaNs'})
})

app.get('/OrganicContaminant_Overview', (req, res) => {
  res.render('OrganicContaminant_Overview', { pageTitle: 'OrganicContaminant_Overview'})
})

app.get('/OrganicContaminant_Remediation_Configuration_Guide', (req, res) => {
  res.render('OrganicContaminant_Remediation_Configuration_Guide', { pageTitle: 'OrganicContaminant_Remediation_Configuration_Guide'})
})

app.get('/OrganicContaminant_Tracer_Configuration_Guide', (req, res) => {
  res.render('OrganicContaminant_Tracer_Configuration_Guide', { pageTitle: 'OrganicContaminant_Tracer_Configuration_Guide'})
})

app.get('/ReachSpecificObservedRunnoff', (req, res) => {
  res.render('ReachSpecificObservedRunnoff', { pageTitle: 'ReachSpecificObservedRunnoff'})
})

app.get('/Sediment_Output_Data_Summary', (req, res) => {
  res.render('Sediment_Output_Data_Summary', { pageTitle: 'Sediment_Output_Data_Summary'})
})

app.get('/SnowDepth_Initialization_Guide', (req, res) => {
  res.render('SnowDepth_Initialization_Guide', { pageTitle: 'SnowDepth_Initialization_Guide'})
})

app.get('/TopoFiles_Output_Summary', (req, res) => {
  res.render('TopoFiles_Output_Summary', { pageTitle: 'TopoFiles_Output_Summary'})
})

app.get('/VelmaParallel_Error_Reports', (req, res) => {
  res.render('VelmaParallel_Error_Reports', { pageTitle: 'VelmaParallel_Error_Reports'})
})

app.get('/VelmaParallel_With_Multiple_Maps', (req, res) => {
  res.render('VelmaParallel_With_Multiple_Maps', { pageTitle: 'VelmaParallel_With_Multiple_Maps'})
})

app.get('/WaterDrainDisturbanceModel_Overview', (req, res) => {
  res.render('WaterDrainDisturbanceModel_Overview', { pageTitle: 'WaterDrainDisturbanceModel_Overview'})
})

app.get('/VelmaSimulatorCmdLine_Overview', (req, res) => {
  res.render('VelmaSimulatorCmdLine_Overview', { pageTitle: 'VelmaSimulatorCmdLine_Overview'})
})

app.get('/VelmaSimulatorAltCmdLine_Overview', (req, res) => {
  res.render('VelmaSimulatorAltCmdLine_Overview', { pageTitle: 'VelmaSimulatorAltCmdLine_Overview'})
})

app.get('/SurfaceEvaporation_Overview', (req, res) => {
  res.render('SurfaceEvaporation_Overview', { pageTitle: 'SurfaceEvaporation_Overview'})
})

app.get('/dev_utils', (req, res) => {
  res.render('dev_utils', { pageTitle: 'Dev Utils'})
})

app.get('/AscMapOct_Guide', (req, res) => {
  res.render('AscMapOct_Guide', { pageTitle: 'AscMapOct_Guide'})
})

app.get('/AscRangeMask_Guide', (req, res) => {
  res.render('AscRangeMask_Guide', { pageTitle: 'AscRangeMask_Guide'})
})

app.get('/MoeVelGenerator_Guide', (req, res) => {
  res.render('MoeVelGenerator_Guide', { pageTitle: 'MoeVelGenerator_Guide'})
})

app.get('/NashSutcliffeCalculator_Guide', (req, res) => {
  res.render('NashSutcliffeCalculator_Guide', { pageTitle: 'NashSutcliffeCalculator_Guide'})
})

app.get('/NseQuarts_Guide', (req, res) => {
  res.render('NseQuarts_Guide', { pageTitle: 'NseQuarts_Guide'})
})

app.get('/VelmaSimRunner_QuickRef', (req, res) => {
  res.render('VelmaSimRunner_QuickRef', { pageTitle: 'VelmaSimRunner_QuickRef'})
})

app.get('/VelmaSimRunner', (req, res) => {
  res.render('VelmaSimRunner', { pageTitle: 'VelmaSimRunner'})
})



// use this as an example https://github.com/expressjs/express/blob/master/examples/ejs/index.js
// already have express and pug installed just need to go from there.
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})