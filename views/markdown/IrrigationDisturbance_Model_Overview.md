Irrigation Disturbance Model Overview
=====================================

<div class="caution_box warning-base">
THIS IS A DRAFT DOCUMENT: ITS CONTENTS MAY CHANGE
</div>

Overview
--------

The Irrigation Disturbance Model provides a way to specify additional water input to a VELMA simulation run at specific locations and times.
The VELMA simulator treats the added water as extra precipitation (although not reported as such in results files),
which permits this ad-hoc water increase without breaking the simulator's core water balance mechanism.

It is possible to add water to a running VELMA simulator via a Modify-by-Map Disturbance Model, but doing so _will_ break the water balance mechanism.
The Irrigation Disturbance Model exists precisely because Modify-by-Map is an unsuitable method for adding water.

Because the Irrigation Disturbance Model water additions are treated as extra precipitation, they "arrive" on cell surfaces,
and penetrate into cell soil layers just as "real" precipitation would.
If a cell receiving irrigation water is saturated, none of the irrigation water will enter that cell's soil layers.
Instead the irrigation water amount will travel laterally, downhill, on the surface.

One distinction between real precipitation and irrigation water is that real precipitation figures into snow model melt calculations, but irrigation water does not.

Configuration Steps
-------------------

### Adding a Basic Modify Landcover Disturbance to a VELMA Configuration

Begin by loading a pre-existing VELMA simulation configuration into JVelma, or by creating a new configuration from within JVelma
(via the Edit -\> "Create a New, Empty Configuration" menu item).

1. Click the Edit -\> "Disturbances" -\> "Add a Disturbance" menu item to open the pop-up dialog titled "Specify Disturbance Model Type and Name".
2. Click the "Disturbance Type" field's drop-down selector list, scroll down the list to the "IrrigationDisturbanceModel" item and click it.
3. Enter a name in the "Disturbance Name" field.The name you enter should use only alphanumeric characters and (optionally) the underbar character, "_".The name you enter must not be used by any other disturbance in your simulation configuration.
4. Click the OK button to add the new disturbance to the configuration and to close the dialog window.

When the Add a Disturbance pop-up dialog is closed by clicking the OK button, JVelma displays the "All Parameters" tab in the main panel
and sets filtering to show only the parameters associated with the newly-added Modify Landcover disturbance.

### Setting Parameters

#### _Parameters That Can (Should!) be Left Alone_

The `modelClass` parameter is set by JVelma when you add a Modify Landcover disturbance to the simulation configuration.
Do Not Change this parameter’s value.  *Ever*.

#### _Parameters That Determine When the Disturbance Occurs_

| Parameter Name            | Expected Value               | Description                                  | Can leave blank? |
| ------------------------- | ---------------------------- | -------------------------------------------- | ---------------- |
| `initializeActiveLoops` | One-based Loop number(s)     | The disturbance occurs only in listed Loops  | NO               |
| `initializeActiveYears` | Full-digits Year number(s)   | The disturbance occurs only in listed Years  | NO               |
| `initializeActiveJdays` | Julian day(s) range=[1, 366] | The disturbance occurs for every listed Jday | NO               |

The following rules apply to values for the Loop, Year, and Jdays parameters above:

* All values must be positive integers.
* The parameter value as whole may consist of:
  * a single value (e.g. 1)
  * a range (e.g. 1999-2010)
  * or a list of values and/or ranges (e.g. 1, 32, 59, 100-205, 365, 366)
* Lists elements must be comma-separated.
* Loop values outside the range of the simulation configuration's [1, `numberOfLoops`] are ignored.
* Year values must be full values (e.g. "99" would be identified as the year 99 CE, *not* the year 1999 CE).
* Year values outside the range of the simulation configuration's [`syear`, `eyear`] (start year and end year) parameter values are ignored.
* Jday values outside the range [1, 366] are ignored, and the value 366 is ignored in non-leap years.

#### _Parameters That Specify the Amount of Water to Add_

The `setIrrigationThreshold` parameter's value specifies the amount of water (in mm) that _may_ added to each eligible cell.

The `setIrrigationMode` parameter's value specifies whether none, some, or all of the `setIrrigationThreshold` amount is actually added.

There are two allowable values for `setIrrigationMode`: `PRECIP_DIFF` and `AS_SPECIFIED` (for historical reasons, `PRECIP_DIFF` is the default setting).

Setting `AS_SPECIFIED` directs the irrigation disturbance to add the amount specified by `setIrrigationThreshold` to each eligible cell
[when the disturbance occurs](#parameters-that-determine-when-the-disturbance-occurs).

Setting `PRECIP_DIFF` produces a more complicated irrigation behavior.
[When the disturbance occurs](#parameters-that-determine-when-the-disturbance-occurs), each eligible cell receives an amount of water
calculated in the following manner:

1. Determine the cell's "total current precipitation": this is the sum of all current precipitation _except_ irrigation
   currently available the cell.  It includes rain, snow melt, and (possibly) tidal amounts.
2. Determine the cell's "water difference":`waterDiff = (setIrrigationThreshold - totalCurrentPrecipitation)`
3. If `waterDiff` is greater than zero, add `waterDiff` as the irrigation amount to the cell, otherwise do not add any water to the cell.

#### _Parameters That Specify Which Cells to Irrigate_

The Irrigation Disturbance Model provides two separate parameters for specifying which cells are eligible for irrigation.
They can be used separately or together.

The `initializeCoverIds` identifies eligible cells by cover ID values.
One or more cover ID values can be specified.
Each must match the `uniqueId` value of one of the cover parameterizations specified in the same configuration.

The `initializeSpecificCells` provides the path/name of .csv driver data file that explicitly lists eligible cells.
The path can be full or relative, but if it is relative, it is assumed relative to the configuration's specified output location.
The .csv driver file contents must be one linear-index (icell) location per line, optionally paired with a comma-separated
specific `setIrrigationThreshold` value.
(The disturbance's own `setIrrigationThreshold` value is used for any cells that do not have a paired value.)

Here is are the lines from a .csv file whose path/name could be specified for a `setIrrigationThreshold` value:

iCell,irrigationThreshold
1735,10.5
1800
2301
2574,14.3

```
The example above specifies four cells for irrigation: 1735, 1800, 2301, and 2574.
Two of these cells (1800 and 2301) do not have paired irrigation threshold values, 
so the distrbance will use whatever value is set for its own `setIrrigationThreshold` with them.
The other two cells are paired with explicit irrigation threshold values, and those values will be used for those cells.

The example above has a header line: `iCell,irrigationThreshold`, but a header line is not required.
If a header line is present, it must _not_ start with a numeric character.
(Remember that "+" and "-" count as numeric characters, along with the digits 0-9.)
Cell locations _must_ be integer values, and lines in the file must _not_ end with a comma.

#### _Cell Eligibity Examples_

Suppose you have three cover types in your simulation: Conifer, Grass, and Scrub, with `uniqueId` values: 1, 2, and 3 respectively.

Here are some examples of how you could use the eligibility parameters to specify which cells to irrigate:

**Example 1:** Irrigate every Grass and Scrub cell, but no Conifer cells.  
* Set `initializeCoverIds` to `2, 3`.  
* Set `initializeSpecificCells` blank (i.e. no value at all).

[When the disturbance occurs](#parameters-that-determine-when-the-disturbance-occurs), every Grass and Scrub cell will be eligible for irrigation.
The disturbance's `setIrrigationThreshold` value is used as the irrigation amount at each cell.

**Example 2:** Irrigate specific cells with specific amounts of water.
* Set `initializeCoverIds` blank (i.e. no value at all).
* Set `initializeSpecificCells` to the path/name of a valid .csv file containing the cells to irrigate and their paired irrigation threshold values.

[When the disturbance occurs](#parameters-that-determine-when-the-disturbance-occurs), each cell in the .csv file (and _only_ those cells) will be
eligible, and will be irrigated by the irrigation threshold paired with it.
If a cell in the file does not have a irrigation threshold paired with it, the disturbance's `setIrrigationThreshold` value is used.

**Example 3:** Irrigate all Grass cells plus specific shrub cells, all by the "defaul" disturbance's `setIrrigationThreshold`.
* Set `initializeCoverIds` to `2`.
* Set `initializeSpecificCells` to the path/name of a valid .csv file containing the specific shrubs cells to irrigate.
Do _not_ include paired, specific irrigation threshold values in the file.

Appendix A: Common Questions
----------------------------

#### Can I specify the same cell with `initializeCoverIds` and `initializeSpecificCells`?

Answer: Yes.  

You can specify a cover type for `initializeCoverIds` and then include one or more cells
of that cover type in the file specified for `initializeSpecificCells`.
If you do this, each "doubly specified" cell is updated once (not twice).
If the cell's `initializeSpecificCells` line contains a paired, specific irrigation threshold value,
that value is used for that cell, instead of the disturbance's default `setIrrigationThreshold` value.

#### Can I specify the same cell more than once in the `initializeSpecificCells` .csv file?

Answer: You may, but only the last mention is used.

If you specify the same cell location multiple times in the `initializeSpecificCells` .csv file,
the cell is "registered" only once by the disturbance, and only by the last line specifying that cell location.

Example:
```

1735,2.80
1735,

```
For the above .csv, the irrigation disturbance would "register" icell 1735 as eligible,
but use its `setIrrigationThreshold` value, not the `2.80` irrigation value in the ealier line.  

Irrigation Disturbances write "Duplicate Irrigation Cell Location" warning
messages the Global State Log .txt file for each duplicate cell line found.


#### Does the `setIrrigationMode` affect all eligible cells?

Answer: Yes.

Regardless of whether a cell is eligible due to `initializeCoverIds` or `initializeSpecificCells`,
and regardless of whether its irrigation threshold value is specified by `setIrrigationThreshold`
or a paired value in the `initializeSpecificCells` .csv file, the `setIrrigationMode` setting is
always used to determine [the water addition](#parameters-that-specify-the-amount-of-water-to-add).

```
