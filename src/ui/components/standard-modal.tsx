import { FaSave as FaSaveRaw, FaTimesCircle as FaTimesCircleRaw } from "react-icons/fa";
// ...existing code...
const FaSave = FaSaveRaw as unknown as React.ComponentType<any>;
const FaTimesCircle = FaTimesCircleRaw as unknown as React.ComponentType<any>;
import * as React from 'react';
import { Modal } from 'react-bootstrap';
import InputCheckbox from './form_elements/input_checkbox';

export default class StandardModal extends React.Component<IStandardModalProps, IStandardModalState> {

    render = (): JSX.Element => {

        let labelAdd = "Add";
        if( this.props.labelAdd)
            labelAdd = this.props.labelAdd;
        let labelClose = !this.props.onSave && !this.props.onAdd ? "Close" : "Cancel";
        if( this.props.labelClose)
            labelClose = this.props.labelClose;
        let labelSave = "Save";
        if( this.props.labelSave)
            labelSave = this.props.labelSave;
        let labelSaveAsNew = "Save as New";
        if( this.props.labelSaveAsNew)
            labelSaveAsNew = this.props.labelSaveAsNew;

        let closeClass = "btn btn-secondary";
        let addClass  = "btn btn-primary";
        if( !this.props.onAdd && !this.props.onSave && !this.props.onSaveAsNew ) {
            closeClass = addClass
        }

        return (
<Modal show={this.props.show} className={this.props.className}>
    <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>

            {this.props.topBarCheckboxFunction && this.props.topBarCheckboxLabel ? (
                <InputCheckbox
                    label={this.props.topBarCheckboxLabel}
                    className="no-margins"
                    checked={this.props.topBarCheckboxValue ? true : false}
                    onChange={this.props.topBarCheckboxFunction}
                />
            ) : null}
            {this.props.topButton}

            <div className="text-right no-wrap">
            {this.props.onClose ? (
                <>
                &nbsp;
            <button
                onClick={this.props.onClose}
                className={closeClass}
                title={labelClose}
            >
                <FaTimesCircle />
            </button>

                </>
            ) : null}

            {this.props.onSave ? (
                <>
                &nbsp;
            <button
                onClick={this.props.onSave}
                className={addClass}
                title={labelSave}
                disabled={this.props.saveDisabled}
            >

                <FaSave />
            </button>

                </>
            ) : null}
            {this.props.onAdd ? (
                <>
                &nbsp;
            <button
                onClick={this.props.onAdd}
                className={addClass}
                title={labelAdd}
                disabled={this.props.saveDisabled}
            >

                <FaSave />
            </button>

                </>
            ) : null}
        </div>
    </Modal.Header>
    <Modal.Body>
            {this.props.children}
    </Modal.Body>
    <Modal.Footer>
        <div className="text-right no-wrap full-width">

            {this.props.onSaveAsNew ? (
                <>
                &nbsp;
            <button
                onClick={this.props.onSaveAsNew}
                className="btn btn-primary pull-left"
                disabled={this.props.saveDisabled}
            >
                {labelSaveAsNew}
            </button>

                </>
            ) : null}

            {this.props.onClose ? (
                <>
                &nbsp;
            <button
                onClick={this.props.onClose}
                className={closeClass}
            >
                {labelClose}
            </button>

                </>
            ) : null}

            {this.props.onSave ? (
                <>
                &nbsp;
            <button
                onClick={this.props.onSave}
                className={addClass}
                disabled={this.props.saveDisabled}
            >
                {labelSave}
            </button>

                </>
            ) : null}
            {this.props.onAdd ? (
                <>
                &nbsp;
            <button
                onClick={this.props.onAdd}
                className={addClass}
                disabled={this.props.saveDisabled}
            >
                {labelAdd}
            </button>

                </>
            ) : null}
        </div>
    </Modal.Footer>
</Modal>
        )
    }
}

interface IStandardModalProps {
    show: boolean;
    title?: string;
    className?: string;
    onClose( e: React.FormEvent<HTMLButtonElement> ): void;
    onSave?( e: React.FormEvent<HTMLButtonElement> ): void;
    onAdd?( e: React.FormEvent<HTMLButtonElement> ): void;
    onSaveAsNew?( e: React.FormEvent<HTMLButtonElement> ): void;

    labelAdd?: string;
    labelClose?: string;
    labelSave?: string;
    labelSaveAsNew?: string;

    topBarCheckboxLabel?: string;
    topBarCheckboxValue?: boolean;
    topBarCheckboxFunction?(
        e: React.FormEvent<HTMLInputElement>,
    ): void;
    topButton?: JSX.Element;

    saveDisabled?: boolean;
    children?: React.ReactNode | React.ReactNode[];
}

interface IStandardModalState {
}