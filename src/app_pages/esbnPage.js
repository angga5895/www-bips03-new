import React from 'react';

class EsbnPage extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="card-header header-pegadaian bg-grey">
                    <div className="row col-sm-12 px-0 mx-0 py-3">
                        <div className="col-sm-10 px-0 mx-0 f-14 align-self-center"></div>
                        <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                            <i className="f-18 ion ion-md-sync click-pointer"></i>
                        </div>
                    </div>
                </div>
                <div className="card-body align-self-center text-center f-16 py-5">
                    <div className="py-5">
                        <div className="py-5">
                            <i className="icofont icofont-warning-alt f-18"></i>
                            <p>E-SBN</p>
                            <p>Not Available</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default EsbnPage;
