
import React from 'react';
import { FaArrowCircleLeft as FaArrowCircleLeftRaw, FaPrint as FaPrintRaw } from "react-icons/fa";
// ...existing code...
const FaArrowCircleLeft = FaArrowCircleLeftRaw as unknown as React.ComponentType<any>;
const FaPrint = FaPrintRaw as unknown as React.ComponentType<any>;
import { Link } from 'react-router-dom';
import { CONST_BATTLETECH_URL } from '../../configVars';
import { IAppGlobals } from '../app-router';
import BattleTechLogo from './battletech-logo';

export default class PrintablePage extends React.Component<IPrintablePageProps, IPrintablePageState> {

    render = (): JSX.Element => {
        return (
        <>
          <div className="print-bar">
            <a
                href={CONST_BATTLETECH_URL}
                rel="noopener noreferrer"
                target="_blank"
                title="Click here to go to the official BattleTech website!"
                className="pull-right"
            >
                <BattleTechLogo />
            </a>

            <Link
              to={this.props.backTo}
              className="pull-left"
            >
              <button className="btn btn-primary">
                <FaArrowCircleLeft />
              </button>
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => window.print()}
            >
              <FaPrint /> Print
            </button>
          </div>
          <div className="print-bg">
            {this.props.children}
          </div>
        </>
        )
    }
}

interface IPrintablePageProps {
    appGlobals: IAppGlobals;
    backTo: string;
    children?: React.ReactNode | React.ReactNode[];
  }

  interface IPrintablePageState {
      updated: boolean;

  }