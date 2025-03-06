LCCM-to-VELMA Translator Utility
=====

Overview
-----

<div style="text-align:center; color:black; background-color:yellow">
THIS IS A DRAFT DOCUMENT: ITS CONTENTS MAY CHANGE
</div>  

The LCCM-to-VELMA ("L2V") Translator utility automates some of the steps required to generate a modifications .csv file for a Modify Landcover disturbance to use as driver data.

The L2V Translator requires its own set of driver data files as input
Some of these are provided directly by LCCM output, and others must be created based on the LCCM output.
All the files the L2V Translator requires must exist and be specified to the LV2 Translator via the L2V Translator's own "configInfo.csv" file when the L2V Translator is run.

The L2V Translator can generate modification data for the LCCM output data from a single simulation date or for multiple simulation dates
depending upon whether it is run in "single-date" or "multi-date" mode.

The `--multidate` command-line argument flag specifies which mode is use:
`--multidate` set? | configInfo specifies ... | generates driver data file for ...
---- | ---- | ----
NO (single-date)  | LCCM map and table files for one simulation date | `ModifyLandcoverDisturbanceModel`
YES (multi-date) | Locations of LCCM map and table files for multiple simulation dates | `ModifyLandcoverMultiDateDisturbanceModel`

L2V multi-date mode can be thought of as a way to automate calling the L2V Translator multiple times in single-date mode.
Instead of preparing multiple single-date configInfo.csv files, you only have to prepare one multi-date configInfo.csv file
(and ensure all the necessary Lccm modification .asc map and .csv table files are in the locations specifed by the multi-date configInfo.csv file).

Running the L2V Translator Utility
-----

### Invoking the L2V Translator

Currently, the L2V Translator is only available as a command-line utility, accessible from VELMA's JVelma .jar file.

If you invoke the L2V Translator utility without any arguments, it prints a usage message, and does nothing else.  
Here is an example using Windows PowerShell:
```
PS C:\Users\Me> java -Xmx1g -cp C:\Users\Me\VELMA\JVelma.jar gov.epa.velmasimulator.LccmTranslatorCmdLine
VELMA_2.2.0.0
Usage: LccmTranslatorCmdLine <fullName_configInfo.csv> [--kv="<key>,<val>"] [--list]
Where:

Required arguments are:

  <fullName_configInfo.csv>
    The fully-qualified path and name of a comma-separated-values (.csv) file.
    The file contains the parameter,value pairs that configure the translator.
    Exactly ONE configInfo csv file fullName must appear in the command line.

Optional arguments are:

  --kv="<key>,<val>"
    <key> is the name of an LccmTranslator configuration parameter.
    <val> is the value to set for that <key>.
    Multiple --kv arguments may occur in the command line.
    No two --kv arguments may specify the same <key>
    The --kv pairs are set or added to the LccmTranslator during initialization.
    The original fullName_configInfo.csv file is NOT modified.
    A --kv argument overrides the value for the same parameter (if specified),
    in the fullName_configInfo.csv file.
    A --kv argument with an invalid key (i.e. parameter name) is ignored.
    A --kv argument with an invalid value will cause an error.

  --multidate
    Indicates <fullName_configInfo.csv> contains paramter,value pairs for building
    a Multi-Date formatted modifications driver data file from multiple map and table
    input files.

  --list
    Prints a complete list of configInfo parameter key names to the console.
    When this option is specified, no results or files are created.

L2V Log CONFIG 2024-10-02 13:28:21 LccmTranslatorCmdLine: Missing required command line arguments.
PS C:\Users\Me>
```
> __*Note:*__ the first line of the LccmTranslatorCmdLine's usage message identifies the .jar file's VELMA version.
> Your command line may display a different version than the example above.

> __*Note:*__ the last line of the LccmTranslatorCmdLine's usage message might look ominous, but it's simply
> the LccmTranslator telling you that it cannot proceed unless the required argument (a configInfo.csv file) is provided as part of the command line.

As the usage message above shows, running the L2V Translator "for real" requires specifying a .csv file containing configuration data.
Optionally, you may also include one or more `--kv=...` arguments, and the `--multidate` argument to switch the L2V Translator into multi-date mode.

**An Example:**
This command line invokes the L2V Translator with a multi-date configInfo.csv file, and overrides the `resultsFileName` parameter's value:
```
PS C:\Users\Me> java -Xmx1g -cp C:\Users\Me\VELMA\JVelma.jar gov.epa.velmasimulator.LccmTranslatorCmdLine `
C:Users\Me\L2v\mdConfig.csv `
--multiDate `
--kv="resultsFileName,C:\Users\Me\md_modifyData.csv"
```
> __*Note:*__ The command line above is broken into multiple lines to emphasize each argument passed to the LccmTranslatorCmdLine.
> Each line ends in a \<space>\<backtick> character sequence, the Microsoft Powershell "line continuation" indicator.
> The above example could really be typed into a Powershell console as multiple "line continued" lines.
> Linux console shells provide the same line-continuation feature, but use different syntax.  
> Consult your shell documentation if you are running on Linux.


### The L2V's Configuration Parameters

The `fullname_configInfo.csv` contains the information about the LCCM data files (for single-date mode) or data locations (for multi-date mode) that the L2V Translator uses as input.

Add the `--list` argument to an L2V Translator command line to see a list of the parameter key names that can be set in an L2V configInfo.csv file.
The `--list` argument is context-sensitive: when the `--multidate` argument is also specified, the list will be for an L2V multi-date configInfo.csv file.
Otherwise, it will be for an L2V single-date configInfo.csv file.  
When the `--list` argument is included on an L2V Translator command line, the L2V Translator ignores any other argumenets,
and performs actions apart from listing the relevant parameter key names.

#### L2V Single-Date Configuration Parmeters

This Windows PowerShell example shows L2V single-date `--list` output:
```
PS C:\Users\Me> java -Xmx1g -cp C:\Users\Me\VELMA\JVelma.jar gov.epa.velmasimulator.LccmTranslatorCmdLine --list
Valid LccmTranslator configInfo Parameter Key Names
(Replace placeholder "???" text with valid values.)
coverMapFileName,???
coverLastMapFileName,???
coverTableFileName,???
soilMapFileName,???
soilLastMapFileName,???
soilTableFileName,???
ageMapFileName,???
ageLastMapFileName,???
ageTableFileName,???
resultsFileName,???
yearPrefix,???
jdayPrefix,???
appendResults,???
PS C:\Users\Me>
```
Here is a summary of the valid (single-date) parameter key names and their corresponding values:

 Parameter Key Name  | Parameter Value   | Parameter's Purpose
-------------------- |   --------------- | -------------------
`coverMapFileName`   | .asc Map filename | LccmId-to-cellId mapping for Cover Types.
`coverLastMapFileName` | .asc Map filename | The previous `coverMapFileName` file (if it exists); used as a delta file.
`coverTableFileName` | .csv cover-lookup table filename | LccmId-to-CoverId + \<spatialChangeText>
`soilMapFileName`    | .asc Map filename | LccmId-to-cellId mapping for Soil Types.
`soilLastMapFileName`| .asc Map filename | The previous `soilMapFileName` file (if it exists); used as a delta file.
`soilTableFileName`  | .csv soi-lookup table filename | LccmId-to-CoverId + \<spatialChangeText>
`ageLastMapFileName` | .asc Map filename | The previous `ageMapFileName` file (if it exists); used as a delta file.
`ageMapFileName`     | .asc Map filename | LccmId-to-cellId mapping for age values.
`ageTableFileName`   | .csv age-lookup table filename | LccmId-to-CoverId + \<ageModification>
`resultsFileName`    | Modify Landcover driver data .csv filename | The file L2V uses for output.
`yearPrefix`         | An integer year value | Optional; when present, prefixed to each row of output.
`jdayPrefix`         | An integer Julian day (of the year) value | Optional; when present, prefixed to each row of output.
`appendResults`      | "true" or "false" | Optional; when present and set "true", L2V appends to resultsFileName instead of overwriting.

Each parameter's value is the name of a file.
Each file name must be fully-qualified (i.e. include the full path for its location).

The `resultsFileName` parameter specifies the file that L2V uses for output,
and which can then be provided as the value of the `modificationDataFilename`
parameter for a Modify Landcover Disturbance.

#### Map and Table Pairing Rules

The six \*Map and \*Table parameters are paired: each pair provide a map and lookup table for cover, soil, or age modifications.
These six parameters _must_ be specified as pairs: it is an error, for example, to specify `soilMapFileName` without specifying `soilTableFileName`, or vice-versa.

However, all 3 pairs of map + lookup files are not required.
Users must specify _at least_ a cover _or_ soil map + lookup pair of files, but the L2V Translator does not require both.
Also, the age map + lookup pair of files is always optional.

The three \*LastMap parameters are always optional.
When specified, they provide the name of the previous (i.e. "Last") cover, soil, or age map used to generate modification data.
The L2V translator uses the paired Map and LastMap to reduce the amount of modification data it generates.
When a cell has the same value in both a Map and its corresponding LastMap for a given type of modification, L2V does not write modification data for that cell (for that modification type).

Note that the same cell's other modification types' Maps that either don't have a corresponding LastMap
or (don't show the same value for the cell when they do)
will still cause L2V to generate and output a modification data row for that cell.
The only way a cell will not generate a modification data row at all is when three \*Map files have corresponding \*LastMap files _and_ all three of the cell's modification types have the same Map and LastMap value.

**An Example:**  
This chart shows LCCM values at a specific cell for the LV2 driver data maps (or "n/p" if the map is not provided) and whether L2V generates a modification row or not.  
(The chart indicates a modification type as ignored by showing "n/p" for _both_ the LastMap and the Map: the corresponding Table file is assumed to be "n/p" in this case as well.)
soilLastMap | soilMap | coverLastMap | coverMap | ageLastMap | ageMap | Result?
----- | ----- | ----- | ----- | ----- | ----- | -----
200 | 200 | 5 | 5 | 10 | 10 | NO modification row output
200 | 200 | 5 | 5 | n/p | 10 | Modification row IS output
200 | 200 | 5 | 9 | 10 | 10 | Modification row IS output
n/p | n/p | 5 | 5 | 5 | 5 | NO Modification row IS output
n/p | n/p | 5 | 9 | 5 | 5 | Modification row IS output

The map files are generated by LCCM, contain LCCM ID values and are assumed to be the values "to change to".
(I.e. the LCCM ID values that LCCM changed to when the map was generated by LCCM.)
Each LCCM ID in a map file indicates the LCCM ID of a cover, soil, or age change at that location.

The lookup tables must be created manually, by the LV2 user, based on an understanding of how
to translate the LCCM IDs provided in the map files into corresponding VELMA cover, soil, or age IDs,
along with any spatial data changes or age modifications that should be made for a given VELMA ID.

#### Map File Format

Any map files specified must be in ASCII grid format.
All the header values (ncols, nrows, cellsize, etc.) must match the header values
of the DEM (parameter `input_dem`) map file specified for in VELMA simulation configuration
that the L2V Translator is generating a Modify Landcover disturbance driver data file for.

Map files are assumed to contain LCCM ID (integer) values; the user must determine the correspondence
between those LCCM ID values VELMA cover and soil ID values.
Those correspondences are made explicit in the lookup table files.

#### Lookup Table File Format

Regardless of whether it is for cover, soil, or age data, an L2V lookup table .csv file 
consists of rows of comma-separated data fields.
Each row maps an LCCM ID to an VELMA ID, followed by the spatial changes (cover and soil)
or age modification (age) associated with transition to the specified VELMA ID.

Specific formats are:

 File for ...        | Row format:
-------------------- | -----------
`coverTableFileName` | `LCCM_coverID,VELMA_coverID,<spatialChangeText>`
`soilTableFileName`  | `LCCM_soilID,VELMA_soilID,<spatialChangeText>`
`ageTableFileName`   | `LCCM_agedID,VELMA_coverID,<ageModification>`

Notice that age lookup tables expect to use VELMA_coverID values.  
In VELMA age is associated with cover types, and does not have separate, independent age IDs.
The L2V translator permits different age-specific LCCM_ageID values, but in practice we expect age LCCM_ageID == LCCM_coverID.

The `<spatialChangeText>` format is the same as Modify Landcover disturbance driver data files use.
(It is in fact, directly copied and output by the L2V translator.)  
The `<ageModification>` format is a Modify Landcover `ModificationOp`.  
Details for both of these are available in the [_Parameters That Determine Which Cells are Modiifed and How They Are Modified_](./ModifyLandcoverDisturbanceModel_Overview.md/#Parameters-That-Determine-Which-Cells-are-Modiifed-and-How-They-Are-Modified) section of the Modify Landcover Disturbance overview document.

Any and all of the LCCM ID values specified in a map file must be present in the corresponding lookup table file.
More than one LCCM ID value may correspond to one VELMA ID value, but each and every LCCM ID from a map file
must appear in exactly one row of the corresponding lookup table file.

#### Example rows for Lookup Tables

__A row for a `coverTableFileName` lookup table file__  
```
25,7,BIOMASS_LEAF_N,0,BIOMASS_AG_STEM,*0.5,HUMUS:4,*0.1
-- - --------------------------------------------------
 | | |
 | | <spatialChangeText>
 | VELMA coverID
 LCCM coverID 
```
Description:  
When a cell location in the `coverMapFileName` has the LCCM ID value 25, 
create (or include in) a Modify Landcover driver data record 
changing the VELMA cover ID to 7 at that cell location, 
and include the spatial data changes specified by the `<spatialChangeText>` in the driver data record.

__A row for a `soilTableFileName` lookup table file__  
```
110,5,GROUNDWATER_FRACTION,0.15
--- - -------------------------
 |  | |
 |  | <spatialChangeText>
 |  VELMA coverID
 LCCM coverID 
```
Description:  
When a cell location in the `soilMapFileName` has the LCCM ID value 110, 
create (or include in) a Modify Landcover driver data record
changing the VELMA soil ID to 5 at that cell location,
and include the spatial data changes specified by the `<spatialChangeText>` in the driver data record.

__A row for an `ageTableFileName` lookup table file__  
```
25,7,*0.5
-- - ----
 | | |
 | | <ageModification>
 | VELMA coverID (VELMA age is ID'ed by coverID)
 LCCM coverID (In this example, assumes LCCM ageID == LCCM coverID)
```
Description:  
When a cell location in the `ageMapFileName` has the LCCM ID value 25,
create (or include in) a Modify Landcover driver data record
changing the VELMA age value (ID'd by coverID == 5) at that cell location
per the specified `<ageModification>`.

Suppose cell location 1753 in the LCCM-provided maps have these LCCM ID values:
Map File | LCCM ID at icell 1735
-------- | ---------------------
`coverTableFileName` | 25
`soilTableFileName`  | 110
 `ageTableFileName`  | 25

Based on the lookup table data examples above, the L2V Translator would output this
Modify Landcover driver data row for cell location 1735:
```
1735,5,7,*0.5,GROUNDWATER_FRACTION,0.15,BIOMASS_LEAF_N,0,BIOMASS_AG_STEM,*0.5,HUMUS:4,*0.1
---- - - ---- ------------------------- -------------------------------------------------- 
   | | | |    |                         |
   | | | |    |                         cover lookup <spatialChangeText>
   | | | |    soil lookup <spatialChangeText>
   | | | age lookup <ageModification> 
   | | VELMA coverID (from the cover lookup)
   | VELMA soilID (from the soil lookup)
   Map location
 ```


### L2V Multi-Date Configuration Parmeters

This Windows PowerShell example shows L2V multi-date `--list` `--multidate` output:
```
PS C:\Users\Me> java -Xmx1g -cp C:\Users\Me\VELMA\JVelma.jar gov.epa.velmasimulator.LccmTranslatorCmdLine --list --multidate
Valid LccmTranslator multidate configInfo Parameter Key Names
(Replace placeholder "???" text with valid values.)
coverMapLocation,???
coverTableLocation,???
soilMapLocation,???
soilTableLocation,???
ageMapLocation,???
ageTableLocation,???
resultsFileName,???
appendResults,???
PS C:\Users\Me>
```
Here is a summary of the valid (single-date) parameter key names and their corresponding values:

 Parameter Key Name  | Parameter Value   | Parameter's Purpose
-------------------- |   --------------- | -------------------
`coverMapLocation`   | fully qualified directory path | Specifies the location of LccmId-to-cellId cover-mapping .asc map files.
`coverTableLocation` | fully qualified directory path | Specifies the location of cover-lookup table .csv files.
`soilMapLocation`    | fully qualified directory path | Specifies the location of LccmId-to-cellId soil-mapping .asc map files.
`soilTableLocation`  | fully qualified directory path | Specifies the location of soil-lookup table .csv files.
`ageMapLocation`     | fully qualified directory path | Specifies the location of LccmId-to-cellId age-mapping .asc map files.
`ageTableLocation`   | fully qualified directory path | Specifies the location of age-lookup table .csv files.
`resultsFileName`    | Modify Landcover driver data .csv filename | The file L2V uses for output.
`appendResults`      | "true" or "false" | Optional; when missing, defaults to "true", when "true", L2V appends to resultsFileName instead of overwriting.

The parameters for a multi-date configInfo.csv are similar to a single-date configInfo.csv, but specify the _locations_
of LCCM data files instead of the files themselves.  
Within those specified locations, 
the [pairing rules](#map-and-table-pairing-rules) and [map](#map-file-format) and [table](#lookup-table-file-format)
requirements specified for single-date mode are all applicable.

Unless you have a specific reason to include it, **do NOT include** `appendResults` in your multi-date configInfo.csv file.
The `appendResults` parameter always defaults to "true" if it is omitted from a multi-date configInfo.csv file.
Setting `appendResults=false` is possible, but _not_ recommended.

#### Multi-Date Map and Table File Naming Formats

When running in multi-date mode, the L2V Translator requires specific filename formats for the LCCM map .asc and table .csv files 
within the directory locations specified in its configInfo.csv file.
The filename formats allow it to select the specific types of files it uses, and gather date information from them.
```
This the file naming convention for the input map and table data files:
  <LCCM_ID><sep><yyyy><sep><jjj><sep><type_name><sep><optional_text><dot_ext>
Where:
  <LCCM_ID> = "LCCM" = A hardwired prefix; any filename used by the L2V translator must begin with this text.
              <yyyy> = A four-digit year; must have leading zero(s) if less than 4 characters long.
              <jjj> = A three-digit day-of-year ("Julian day"); must have leading zeros if < 100.
        <type_name> = One of: ["coverMap", "coverTable", "soilMap", "soilTable", "ageMap", "ageTable"]
    <optional_text> = Arbitrary text that is ignored by the L2V Translator
          <dot_ext> = one of [".asc", ".csv], as appropriate for map or table.

        <sep> = "_" = the separator used to ensure the filename can be easily split into fields.

  Example:

        +----+---+--------+---- <sep>
        |    |   |        |     
        |    |   |        |     +---+-+-+---- [ignored]
        |    |   |        |     |   | | |
    LCCM_2020_010_coverMap_rings_7x5_1_2_3.asc
    |    |    |   |        |              |
    |    |    |   |        |              <doc_ext>
    |    |    |   |        <optional_text>   
    |    |    |   <type_name>
    |    |    <jjj>    
    |    <yyyy>    
    <LCCM_ID>  
```
Any files within the diretory locations specified by a multi-date configInfo.csv file that do not match this filename format are ignored by the L2V Translator.


### L2V Translator Log Messages

When you run the L2V Translator from the command line, it provides information about the translator run to the console, and (if possible) copies the same output to a file.
Logger message lines always start with the prefix `L2V`, to make them easier to identify within the console.

Logger messages are copied to a log file named `LccmTranslatorRunlog.txt`.
* The L2V Translator tries to place the log file into the same directory as the output file specified by the `resultsFileName` parameter.
* If the `resultsFileName` parameter isn't specified, the log file is placed in your home directory (e.g. on Windows 11, under `C:\Users\<your_user_name>`).
* If the L2V Translator cannot write messages to a log file at all, it will warn you by logging a message (only to the console) that looks like this:  
`L2V Log WARNING [...] Cannot log to file: logging messages only to console.`  
If you see the warning above on your console, you'll still get logging messages on the console, but they won't be recorded in a file.

> __*Implementation Note:*__ the L2V Translator uses _only_ Java's `java.utils.Logger` class.
> It does _NOT_ use Apache's `Log4j` logger framework.
> The `Log4j` package is _not_ included in VELMA code.


Appendix A: Common Questions
----------------------------

#### Can I specify one LCCM ID file for multiple L2V configInfo map parameters?

Answer: Yes, but you must provide the corresponding lookup table file for each use of the (single) map file.

A common, expected case is using the LCCM ID cover map file as the value for
both the `coverMapFileName` and the `ageMapFileName` in an L2V Translator's configInfo parameterization.  
In this situation, you must still provide and specify two, separate lookup table files,
one for `coverTableFileName`, and another for `ageTableFileName`.
However, the contents of each of the two lookup table files would have rows corresponding
to the same LCCM ID values from the one LCCM ID map file.

__Example:__
Here's a tiny LCCM ID cover map file, named "LCCM_Tiny_Cover.asc":
```
ncols 7
nrows 5
xllcorner 707561.39803805
yllcorner 4327118.0852998
cellsize 30.0
nodata_value -9999
1 1 3 2 2 5 4
1 1 3 3 3 5 4
1 3 3 5 5 5 4
5 5 5 5 4 4 4
5 5 4 4 4 4 4 
```
Here is an L2V Translator lookup table file coded for the values in LCCM_Tiny_Cover.
File "Tiny_Cover_Lookup.csv":
```
1,20,BIOMASS_LEAF_N,0,BIOMASS_AG_STEM,*0.5,HUMUS:4,*0.1
2,25,BIOMASS_LEAF_N,+10,DETRITUS_LEAF_N,*0.1,HUMUS:1,*0.2,HUMUS:2,*0.2
3,30,BIOMASS_LEAF_N,+10,DETRITUS_LEAF_N,*0.1,HUMUS:1,*0.2,HUMUS:2,*0.2
4,20,
5,40,DETRITUS_LEAF_N,*0.25
```
Noteworthy in the example cover lookup table file contents above:
* Every LCCM ID must be specified exactly once.
* Multiple LCCM ID value can correspond to a single VELMA ID (LCCM IDs 1 and 4 map to VELMA ID 20).
* The lookup table `<spatialChangeText>` can be omitted, or duplicated in multiple rows; whatever is appropriate for the VELMA ID.

Here is an L2V Translator lookup table file coded for the same "LCCM_Tiny_Cover.asc" file's values.
File "Tiny_Age_Lookup.csv":
```
1,20,0
2,25,*1.1
3,30,*1.1
4,20,+0
5,40,*0.1
```
Notes about the age lookup tabe data above:
* The LCCM_ID,VELMA_ID pairings duplicate the cover lookup table; but here, they specify `<ageModification>` values.
* The `1,20` row's `<ageModification>` is `0` -- there is no operator prefix, so this means: set the age to zero.
* The `4,20` row's `<ageModification>` is `+0`, this is the preferred idiom for: "don't modify the current age value".

And finally, given the example files above, the relevant lines in the L2V Translator's configInfo.csv file could look like this:
```
coverMapFileName,C:\Users\Me\L2V_Files\LCCM_Tiny_Cover.asc
coverTableFileName,C:\Users\Me\L2V_Files\Tiny_Cover_lookup.csv
ageMapFileName,C:\Users\Me\L2V_Files\LCCM_Tiny_Cover.asc
ageTableFileName,C:\Users\Me\L2V_Files\Tiny_Age_lookup.csv
```

#### Can I specify the same VELMA ID as the target of multiple LCCM ID values?

Answer: Yes, multiple rows of an L2V lookup table can specify the same VELMA ID.
But, each row in the lookup table must specify a different LCCM ID, and each
LCCM ID from the lookup table's corresponding map file must appear in the lookup table.

#### Can I specify only the age map and lookup pair of files?

Answer: No. You must specify _at least_ one other pair of files: either for soil or for cover.
Typically, age and cover file pairs are specified more often than age and soil file pairs, but that's not a hard-and-fast rule.

#### Can the L2V Translator create more than one modification data driver file at a time?

Answer: No.  
If Multiple LCCM changes are available for a simulation run,
you must run the L2V Translator once for each set of LCCM changes (.asc map files),
and configure a separate Modify Landcover disturbance for in your VELMA simulation
for each modification driver data .csv file generated by the multiple L2V Translator runs.
If you find yourself in this situation, consider running the L2V Translator in multi-date mode.
You will still generate a single modification data driver file, but it will be for
a `ModifyLandcoverMultiDateDisturbanceModel`, and contain the modification data for
all of the LCCM changes for that simulation run.

#### Can I use the `--kv` command line argument to "override" a parameter that isn't in my configInfo.csv file?

Answer: Yes!  
In fact, there is at least one common use-case:
1. Create a configInfo.csv without the `resultsFileName`,
2. Set/add the results filename on the command line via a `--kv` argument.

The advantage of the above is that you don't have to edit the configInfo.csv file
if you want to change the results filename (or want to generate two different files with the same data).
The disadvantage is that the configInfo.csv does not "document" what the results file's name was.

You can also "set" key,value pairs with `--kv` arguments that are not valid L2V Translator parameters.
These are ignored by the L2V Translator, but it's a bad practice to specify invalid parameter names.
