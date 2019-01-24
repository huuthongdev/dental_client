import React, { Component } from 'react';

class CpnCurrencyInput extends Component {
    componentWillMount() {
        if (!this.props.onChange) return;
        const value = +this.convertToCurrency(this.props.value);
        this.props.onChange(value);
    }

    handleChange = (e) => {
        if (!this.props.onChange) return;
        const value = +this.convertToCurrency(e.target.value);
        this.props.onChange(value);
    }

    toShow = (value) => {
        let { prefix, subfix } = this.props;
        prefix = prefix ? prefix : '';
        subfix = subfix ? subfix : 'đ';
        if (value) return `${prefix}${this.convertToCurrency(value).toLocaleString('en-GB')}${subfix}`;
        return '';
    };

    convertToCurrency = (input) => {
        if (!input) return null;
        let value = input.toString();
        // remove all characters that aren't digit or dot
        value = value.replace(/[^0-9.]/g, '');
        // replace multiple dots with a single dot
        value = value.replace(/\.+/g, '.');
        // only allow 2 digits after a dot
        value = value.replace(/(.*\.[0-9][0-9]?).*/g, '$1');
        // replace multiple zeros with a single one
        value = value.replace(/^0+(.*)$/, '0$1');
        // remove leading zero
        value = value.replace(/^0([^.].*)$/, '$1');
        return +value;
    }

    render() {
        return <input
            type="text"
            disabled={this.props.disabled}
            value={this.toShow(this.props.value)}
            onChange={this.handleChange}
        />
    }
}

export default CpnCurrencyInput;