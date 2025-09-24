import React from 'react';
import { FaDice as FaDiceRaw, FaDownload as FaDownloadRaw, FaFileImport as FaFileImportRaw, FaHeart as FaHeartRaw, FaPrint as FaPrintRaw, FaTrash as FaTrashRaw } from "react-icons/fa";
// ...existing code...
const FaDice = FaDiceRaw as unknown as React.ComponentType<any>;
const FaDownload = FaDownloadRaw as unknown as React.ComponentType<any>;
const FaFileImport = FaFileImportRaw as unknown as React.ComponentType<any>;
const FaHeart = FaHeartRaw as unknown as React.ComponentType<any>;
const FaPrint = FaPrintRaw as unknown as React.ComponentType<any>;
const FaTrash = FaTrashRaw as unknown as React.ComponentType<any>;
import { Link } from 'react-router-dom';
import { BattleMech } from "../../../../classes/battlemech";
import { BattleMechGroup, ICBTGroupExport } from '../../../../classes/battlemech-group';
import { unitGroupNames } from '../../../../data/group-names';
import { makeURLSlug } from '../../../../utils/makeURLSlug';
import { IAppGlobals } from '../../../app-router';
import InputField from '../../../components/form_elements/input_field';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';
import BattleMechTableGroup from './_tableGroup';

export default class BattleMechRosterHome extends React.Component<IHomeProps, IHomeState> {

    fileReader: FileReader | null = null;

    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            updated: false,
            showBMUnit: null,
            editBMUnit: false,

        }

        this.props.appGlobals.makeDocumentTitle("Alpha Strike Roster");

    }

    newGroup = (): void => {
      if( this.props.appGlobals.currentCBTForce) {
        this.props.appGlobals.currentCBTForce.newGroup();
        this.props.appGlobals.saveCurrentCBTForce( this.props.appGlobals.currentCBTForce );
      }
    }

    removeGroup = ( bmGroupIndex: number ): void => {
      if( this.props.appGlobals.currentCBTForce && this.props.appGlobals.currentCBTForce.groups.length > bmGroupIndex ) {
        if(this.props.appGlobals.currentCBTForce.groups[bmGroupIndex].getTotalUnits() === 0 ) {
          this.props.appGlobals.currentCBTForce.removeGroup(bmGroupIndex);
          this.props.appGlobals.saveCurrentCBTForce( this.props.appGlobals.currentCBTForce );
        } else {
          this.props.appGlobals.openConfirmDialog(
            "Confirmation",
            "This group still contains units. Are you sure you want to still remove it?",
            "Yes",
            "No",
            () => {
              if( this.props.appGlobals.currentCBTForce ) {
                this.props.appGlobals.currentCBTForce.removeGroup(bmGroupIndex);
                this.props.appGlobals.saveCurrentCBTForce( this.props.appGlobals.currentCBTForce );
              }
            }
          );
        }
      }
    }

    selectGroupLabel = ( newName: string, groupIndex: number ): void => {
      if( this.props.appGlobals.currentCBTForce) {
      this.props.appGlobals.currentCBTForce.selectGroupLabel( newName, groupIndex );
      this.props.appGlobals.saveCurrentCBTForce( this.props.appGlobals.currentCBTForce );
    }
  }

    renameGroup = ( newName: string, bmGroupIndex: number ): void => {
      if( this.props.appGlobals.currentCBTForce) {
        this.props.appGlobals.currentCBTForce.renameGroup( newName, bmGroupIndex );
        this.props.appGlobals.saveCurrentCBTForce( this.props.appGlobals.currentCBTForce );
      }
    }

    removeFavoriteConfirm = ( favGroupIndex: number ): void => {

      this.props.appGlobals.openConfirmDialog(
        "Confirmation",
        "Are you sure you want to delete this favorite group?",
        "Yes",
        "No",
        () => {
          this.props.appGlobals.removeCBTGroupFavorite(favGroupIndex);
        }
      );
    }

    loadBMFavorite = (favGroup: BattleMechGroup ): void => {
      if( this.props.appGlobals.currentCBTForce ) {
        favGroup.setNew();
        this.props.appGlobals.currentCBTForce.groups.push( favGroup );
        this.props.appGlobals.saveCurrentCBTForce( this.props.appGlobals.currentCBTForce );
      }
    }

    openViewUnit = ( theUnit: BattleMech ): void => {
      let showBMUnit = theUnit;

      this.setState({
        showBMUnit: showBMUnit,
        editBMUnit: false,
      })
    }

    openEditUnit = ( showBMUnit: BattleMech ): void => {

      this.setState({
        showBMUnit: showBMUnit,
        editBMUnit: true,

      })
    }

    closeShowUnitDialog = (): void => {
      this.setState({
        showBMUnit: null,
      })
    }

    selectFile = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
      e.preventDefault();
      if( e.currentTarget.files && e.currentTarget.files.length > 0 ) {
        let foundFile = e.currentTarget.files[0];
        // console.log( "test", foundFIle );
        if( foundFile.type === "application/json" ) {
          this.fileReader = new FileReader();
          this.fileReader.onloadend = this.handleFileRead;
          this.fileReader.readAsText( foundFile );
        }

      }
    }

    handleFileRead = (e: any) => {
      if( this.fileReader ) {
        let content = this.fileReader.result;

        // console.log("content", content)
        try {
          if( content ) {
            let data: ICBTGroupExport = JSON.parse( content.toString() )

            // let btFavCBTGroup = this.props.appGlobals.favoriteCBTGroup;
            // for( let item of data ) {
            let parsedItem =  new BattleMechGroup(data);
            // }

            this.props.appGlobals.saveCBTGroupFavorite( parsedItem );
          }
        }
        catch (err) {
          console.error("Could not import JSON", err)
        }
      }
    }

    render = (): JSX.Element => {
      return (
        <>
{/* <BattleMechEditViewModal
  appGlobals={this.props.appGlobals}
  showBMUnit={this.state.showBMUnit}
  editBMUnit={this.state.editBMUnit}
  closeShowUnitDialog={this.closeShowUnitDialog}
/> */}

        <UIPage current="classic-battletech-roster" appGlobals={this.props.appGlobals}>

          <div className="alert alert-danger">
            <h4 className="text-center">In Development</h4>
            <p>This area will be the equivalent of the Roster Maker in Alpha Strike. If anything seems to work, it likely doesn't. Use at your owm risk!</p>
            <p><strong>Update 2022 Apr 28</strong>: The Print Force area should be working great. The Play Mode is making huge srides and getting closer! Initial tests are working for all phases, but it's still heavily under testing. I've not got to the Mechwarrior hits yet. There are quite a few interface bugs which are bothering me. </p>
            <del><p><strong>Update 2022 Apr 3</strong>: With the exception of the Play/Print buttons this <em>MIGHT</em> work. I'll work on the Print button first, then onward to the intense Play button (since I'll have to code the electronic record sheet functions)</p></del>
            <p className="text-center">Feel free to file an <a target="github" href="https://github.com/jdgwf/battletech-tools/issues">Issue</a> for anything here - I'll likely already be aware of it, but if you've got an idea for play-flow let me know. I've tried to make it so that everything is just a step-by-step process as you roll the dice and move your models.</p>
          </div>
          {this.props.appGlobals.currentCBTForce && this.props.appGlobals.currentCBTForce.getTotalUnits() > 0 ? (
            <div className="row">
              <div className="col-6">
                <Link
                  to={`${process.env.PUBLIC_URL}/classic-battletech/roster/play`}
                  className="btn btn-primary no-margin full-width"
                  title="Click here to go into 'Play Mode'"
                >
                    <FaDice />&nbsp;Play Mode
                </Link><br />
                <br />
              </div>
              <div className="col-6">
                <Link
                  to={`${process.env.PUBLIC_URL}/classic-battletech/roster/print`}
                  className="btn btn-primary no-margin full-width"
                  title="Click here to go to a printable version of this page"
                >
                    <FaPrint />&nbsp;Print Force
                </Link><br />
                <br />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="row">
            <div className="col-lg-6">
              <TextSection
                label='Current CBT Force'
              >
            {this.props.appGlobals.currentCBTForce ? (
                  <p className="text-center">
                  <strong>Total Groups</strong>: {this.props.appGlobals.currentCBTForce.getTotalGroups()}&nbsp;|&nbsp;
                  <strong>Total Units</strong>: {this.props.appGlobals.currentCBTForce.getTotalUnits()}&nbsp;|&nbsp;
                  <strong>Total Tons</strong>: {this.props.appGlobals.currentCBTForce.getTotalTons()}&nbsp;|&nbsp;
                  <strong>Total BV2</strong>: {this.props.appGlobals.currentCBTForce.getTotalBV2()}

                </p>
                ) : null}
              {this.props.appGlobals.currentCBTForce ? (
                <>
                  {this.props.appGlobals.currentCBTForce.groups.map( (bmGroup, bmGroupIndex) => {
                    return (
                      <fieldset key={bmGroupIndex} className="fieldset">
                        <legend>{bmGroup.groupLabel} #{bmGroupIndex +1}</legend>

                    <div className="pull-right">
                      <button
                        onClick={() => this.props.appGlobals.saveCBTGroupFavorite( bmGroup )}
                        title={bmGroup.members.length === 0 ? "A group need to have members to save as a favorite" : "Click here to add this group to your favorites."}
                        className="btn btn-primary btn-sm"
                        disabled={bmGroup.members.length === 0}
                      >
                        <FaHeart />
                      </button>
                      <button
                        onClick={() => this.removeGroup(bmGroupIndex)}
                        title="Click here to remove this group."
                        className="btn btn-danger btn-sm"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="width-80">
                        <div className="width-50">
                            <label>
                                <select
                                    title="Select your Group Organization Label"
                                    onChange={(event: React.FormEvent<HTMLSelectElement>) => this.selectGroupLabel(event.currentTarget.value, bmGroupIndex)}
                                    value={bmGroup.groupLabel}
                                >
                                    {unitGroupNames.map( (name, nameIndex) => {
                                        return (
                                            <option key={nameIndex}>{name}</option>
                                        )
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="width-50">
                            <InputField
                                title="Here you can name your unit"
                                placeholder={"Custom " + bmGroup.groupLabel + " Name"}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => this.renameGroup(event.currentTarget.value, bmGroupIndex)}
                                value={bmGroup.customName}
                            />
                        </div>
                    </div>

                    <BattleMechTableGroup
                      appGlobals={this.props.appGlobals}
                      bmGroupIndex={bmGroupIndex}
                      showAdd={true}
                      showEdit={true}
                    />

                      </fieldset>
                    )
                  })}
                </>
              ) : null}
<p>
                  <button
                    onClick={this.newGroup}
                    className="display-block text-center btn btn-primary full-width no-margin"
                  >
                    New Group
                  </button>
                </p>
                {this.props.appGlobals.currentCBTForce ? (
                  <p className="text-center">
                  <strong>Total Groups</strong>: {this.props.appGlobals.currentCBTForce.getTotalGroups()}&nbsp;|&nbsp;
                  <strong>Total Units</strong>: {this.props.appGlobals.currentCBTForce.getTotalUnits()}&nbsp;|&nbsp;
                  <strong>Total BV2</strong>: {this.props.appGlobals.currentCBTForce.getTotalBV2()}

                </p>
                ) : null}
                </TextSection>
            </div>
            <div className="col-lg-6">

            {this.props.appGlobals.favoriteCBTGroups.length > 0 ? (

<TextSection
  label="Favorite CBT Groups"
>

{this.props.appGlobals.favoriteCBTGroups.map( (favGroup, favGroupIndex)=> {
  return (
    <fieldset className='fieldset'  key={favGroupIndex}>
      <legend>{favGroup.getName(favGroupIndex, true)}</legend>

      <div className="pull-right">
      <a
          className="btn btn-primary btn-sm"
          title="Export this favorite to a JSON format to transfer between devices"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(favGroup.export())
          )}`}
          download={"cbt-group-favorite-export-" + makeURLSlug(favGroup.getName(0)) + ".json"}
        >
          <FaDownload />
        </a>
      <button
        onClick={() => this.loadBMFavorite(favGroup)}
        title="Load this favorite group to your current force"
        className="btn-sm btn-primary btn"
      >
        <FaFileImport />
      </button>

      <button
        onClick={() => this.removeFavoriteConfirm( favGroupIndex)}
        title="Remove this favorite"
        className="btn-sm btn-danger btn"
      >
        <FaTrash />
      </button>
    </div>

    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Tons</th>
          <th>Tech</th>
          <th className="min-width no-wrap text-center">Piloting</th>
          <th className="min-width no-wrap text-center">Gunnery</th>
          <th className="min-width no-wrap text-center">Points</th>
        </tr>
      </thead>
      {favGroup.members.map( (mechObj, mechIndex) => {
            let pilotBV2 = mechObj.getPilotAdjustedBattleValue();
            let baseBV2 = mechObj.getBattleValue();

            return (
                <tbody key={mechIndex}>
                <tr>
                    <td>
                        {mechObj.getName()}
                        {mechObj.pilot.name && mechObj.pilot.name.trim() ? (
                            <div className='small-text'>
                                <strong>Pilot:</strong> {mechObj.pilot.name}
                            </div>
                        ) : null}

                    </td>
                    <td className="min-width no-wrap text-center">{mechObj.getTonnage()}</td>
                    <td className="min-width no-wrap text-center small-text">{mechObj.getTech().name}</td>
                    <td className="min-width no-wrap text-center">{mechObj.pilot.piloting}</td>
                    <td className="min-width no-wrap text-center">{mechObj.pilot.gunnery}</td>
                    <td className="min-width no-wrap text-center">
                        {pilotBV2 !== baseBV2 ? (
                            <>
                                {pilotBV2}
                                <div className='small-text'>Base: {baseBV2}</div>
                            </>
                        ) : (
                            <>{pilotBV2}</>
                        )}
                    </td>

                </tr>
                </tbody>
            )
        })}

<tfoot>
<tr>

<td colSpan={1}>
{favGroup.members.length > 0 ? (
    <>
        {favGroup.members.length > 0 ? (
            <>{favGroup.members.length} Units</>
        ) : (
            <>One Unit</>
        )}
    </>
) : (
    <>No Units</>
)}
</td>
<td colSpan={4} className="text-center">
    {favGroup.getTotalTons()} Tons - {favGroup.getTech()}
</td>
<td colSpan={1} className="no-wrap text-right">BV2: {favGroup.getTotaBV2()}</td>
</tr>
</tfoot>
    </table>
    </fieldset>
  )
 })}
</TextSection>
): null}

<TextSection
label='Import to your CBT Favorites'
>
<div className="text-small">Use this uploader to restore your favorites from another device. The file will be named, unless it was renamed, "cbt-group-favorite-export-*,json"</div>

<label
title="Click here to select a JSON file exported this page"
>
Import JSON:&nbsp;
<input
type="file"
style={{width: "auto"}}
onChange={this.selectFile}
/>
</label>
<br />
</TextSection>
            </div>
          </div>

          </UIPage>
        </>
      );
    }
}

interface IHomeProps {
  appGlobals: IAppGlobals;

}

interface IHomeState {
  updated: boolean;

  // searchText: string;
  showBMUnit: BattleMech | null;
  editBMUnit: boolean;

}