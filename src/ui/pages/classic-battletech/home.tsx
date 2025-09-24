import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../app-router';
import TextSection from '../../components/text-section';
import UIPage from '../../components/ui-page';
import { GiMissileMech as GiMissileMechRaw } from "react-icons/gi";
import { MdTableView as MdTableViewRaw } from 'react-icons/md';
// ...existing code...
const GiMissileMech = GiMissileMechRaw as unknown as React.ComponentType<any>;
const MdTableView = MdTableViewRaw as unknown as React.ComponentType<any>;

export default class ClassicBattleTechHome extends React.Component<IClassicBattleTechHomeProps, IClassicBattleTechHomeState> {
    constructor(props: IClassicBattleTechHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Classic BattleTech Home");
    }

    render = (): JSX.Element => {
      return (
        <UIPage current="classic-battletech-home" appGlobals={this.props.appGlobals}>

          <TextSection
            label="Classic BattleTech"
          >
              <div className="icon-links">
                  <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator`}>
                    <GiMissileMech />
                    'Mech Creator
                  </Link>

                  <Link  to={`${process.env.PUBLIC_URL}/classic-battletech/roster`}>
                    <MdTableView />
                    Classic BattleTech Roster
                  </Link>
              </div>

            </TextSection>

        </UIPage>
      );
    }
}

interface IClassicBattleTechHomeProps {
  appGlobals: IAppGlobals;
}

interface IClassicBattleTechHomeState {
    updated: boolean;

}