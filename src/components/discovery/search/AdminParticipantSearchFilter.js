import React, { useEffect, useState } from "react";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import ParticipantManagementSelector from "../../admin/ParticipantManagementSelector";
import AdminTypeFilterView from "../../admin/AdminTypeFilterView";
import AdminLocationFilterView from "../../admin/AdminLocationFilterView";
import { useDispatch } from "react-redux";
import { updateFilterCriteria } from "../../../actions";

const AdminParticipantSearchFilter = ({type}) => {
    
    // TODO: change to right API call

    const REGISTRATION_URL = process.env.REACT_APP_EDGE_API_URI + '/admin/pr/registration-types';
    const LOCATION_URL = process.env.REACT_APP_EDGE_API_URI + '/admin/pr/locations';

//    const fakeLocation = {"items": [{"loc_code": "Germany","name": "Germany","qty": 10},{"loc_code": "Italy","name": "Italy","qty": 20}]}
//    const fakeRegistrationType = {items: [{name: "admin_ppr",qty: 10},{name: "admin_pcr",qty: 20},{name: "admin_np",qty: 30}]}

    const [filters, setFilters] = useState([]);
    const dispatch = useDispatch();

    // updates redux filterCriteria every 1s if something has been changed. When there is a change in between, will wait 1s again
    useEffect(() => {
        const timerId = setTimeout(() => {
            dispatch(updateFilterCriteria({ filterCriteria: filters }));
        }, 1000);
        return () => {
            clearTimeout(timerId);
    }
    }, [filters]);

    // update state of current filters
    const onFormChanged = (a) => {
        if (a.target.checked === true) {
            setFilters([...filters, { key: a.target.name, value: a.target.value }]);

        } else {
            setFilters(filters.filter(({ key, value }) => { return !(key === a.target.name && value === a.target.value) }));
        }
    }


    const showRegistrationType = ({data}) => {
        return (<AdminTypeFilterView data={data} onFormChanged={onFormChanged} header='registration_type'/>);
    }

    const showLocation = ({data}) => {
        return (<AdminLocationFilterView data={data} onFormChanged={onFormChanged} header='location'/>);
    }


    return (
    <>
        <ParticipantManagementSelector type={type}/>
        <LoadingView url={REGISTRATION_URL} successView={showRegistrationType}/>
        <LoadingView url={LOCATION_URL} successView={showLocation}/>
    </>)

}
AdminParticipantSearchFilter.propTypes = {
    type: PropTypes.string
};

export default AdminParticipantSearchFilter;
