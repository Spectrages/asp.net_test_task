import "./MyInput.css"
const MyInput = ({ value, onChange, pattern, placeholder, maxLength, minLength, htmlFor, labelTitle, list, onInvalid}) => {
    return (
        <div className="row">
            <label htmlFor={htmlFor}>{labelTitle}</label>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                pattern={pattern}
                maxLength={maxLength || 30}
                minLength={minLength || 2}
                list={list || null}
                required
                onInvalid={onInvalid}
            />
            <datalist id="codes">
                <option value="+375 29 " />
                <option value="+375 33 " />
                <option value="+375 25 " />
                <option value="+375 44 " />
            </datalist>
        </div>
    )
}
export default MyInput;