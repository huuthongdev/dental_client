import React, { PureComponent } from 'react';

class CpnCurrencyInput extends PureComponent {
    state = {
        isFocus: false
    }

    componentWillMount() {
        if (!this.props.onChange) return;
        let value = +this.convertToCurrency(this.props.value);
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
        subfix = subfix ? subfix : '';
        if (value) return `${prefix}${this.convertToCurrency(value).toLocaleString('vi-VN')}${subfix}`;
        return '';
    };

    convertToCurrency = (input) => {
        if (!input) return null;
        let value = input.toString();
        // remove all characters that aren't digit or ,
        value = value.replace(/[^0-9]/g, '');
        // replace multiple , with a single ,
        value = value.replace(/,+/g, ',');
        // only allow 2 digits after a ,
        value = value.replace(/(,*,[0-9][0-9]?),*/g, '$1');
        // replace multiple zeros with a single one
        value = value.replace(/^0+(.*)$/, '0$1');
        // remove leading zero
        value = value.replace(/^0([^.].*)$/, '$1');
        const { min, max } = this.props;
        let valueOuput = +value;
        if (max && !isNaN(max)) { if (+value > max) valueOuput = +max; }
        if (min && !isNaN(min)) { if (+value < min) valueOuput = +min; }
        return valueOuput;
    }

    render() {
        const { onBlur, onFocus } = this.props;

        return <input
            onFocus={() => {
                this.setState({ isFocus: true });
                if (onFocus) onFocus();
                document.onkeyup = (e) => {
                    if (e.which === 8) {
                        // Decrease value
                        if (this.state.isFocus) {
                            let value = +this.props.value.toString().slice(0, this.props.value.toString().length - 1);
                            this.props.onChange(+value);
                        }
                    }
                    if (e.which === 40) {
                        if (this.state.isFocus && this.props.value >= 1) {
                            this.props.onChange(this.convertToCurrency(+this.props.value - 1));
                        }
                        // Decrease 1
                    }
                    if (e.which === 38) {
                        if (this.state.isFocus && this.props.value >= 0) {
                            // Increase 1
                            this.props.onChange(this.convertToCurrency(+this.props.value + 1));
                        }
                    }
                }
            }}
            onBlur={() => {
                this.setState({ isFocus: false });
                onBlur();
            }}
            type="text"
            disabled={this.props.disabled}
            value={this.toShow(this.props.value)}
            onChange={this.handleChange}
        />
    }
}

export default CpnCurrencyInput;