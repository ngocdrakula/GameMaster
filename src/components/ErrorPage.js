import React from 'react'

export default class ErrorPage extends React.Component {
    state = {}
    render() {
        const path = this.props.path || (this.props.location && this.props.location.pathname) || "";
        return (
            <React.Fragment>
                Trang bạn đang truy cập: "{path}" không tồn tại!
            </React.Fragment>
        )
    }
}