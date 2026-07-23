import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentProfile, removeBus } from '../../actions/profile'


const Profile = ({ getCurrentProfile, removeBus, auth: { user } }) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])
    return (
        <Fragment>
            <div className="profile-grid my-1">
                <div className="profile-top bg-primary p-2">
                    <h1 className="large"><i className="fas fa-user"></i> {user && user.name}</h1>
                    <div className="icons my-1">
                        <h3>
                            <i className="fas fa-globe fa-2x" />  {user && user.email}
                        </h3>
                        <h3>
                            <i className="fas fa-phone fa-2x" />  {user && user.contact}
                        </h3>
                    </div>
                </div>
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Booked Tickets</h2>
                    <ul>
                        {user && user.ticket && user.ticket.length > 0 ? (
                            <Fragment>
                                {user.ticket.map((tkt, idx) => {
                                    let seats = [];
                                    let names = [];
                                    try {
                                        seats = typeof tkt.noArray === 'string' ? JSON.parse(tkt.noArray) : tkt.noArray;
                                        names = typeof tkt.nameArray === 'string' ? JSON.parse(tkt.nameArray) : tkt.nameArray;
                                    } catch (e) {
                                        seats = [tkt.noArray];
                                        names = [tkt.nameArray];
                                    }
                                    return (
                                        <li key={idx} style={{ listStyleType: 'none', marginBottom: '20px' }}>
                                            <div className="container1">
                                                <div className="card">
                                                    <div className="box">
                                                        <div className="content">
                                                            <h2>{idx + 1}</h2>
                                                            <h3>From: {tkt.from}</h3>
                                                            <h3>To: {tkt.to}</h3>
                                                            <span><h1>Seats: </h1> <strong>{Array.isArray(seats) ? seats.join(', ') : seats}</strong> </span>
                                                            <span><h1>Passengers: </h1> <strong>{Array.isArray(names) ? names.join(', ') : names}</strong> </span>
                                                            <span><h1>Date: </h1> <strong>{tkt.dat}</strong> </span>
                                                            <span><h1>Bus ID: </h1>{tkt.tokenData}</span>
                                                            <button className="btn btn-danger" onClick={() => removeBus(tkt.tokenData)}>Cancel Ticket</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </Fragment>
                        ) : (
                            <h4>No Tickets Found.</h4>
                        )}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}



Profile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    removeBus: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, removeBus })(Profile)
