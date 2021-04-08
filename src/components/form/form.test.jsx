import Form, {cb} from './form'

describe('Form', () => {
    let render

    beforeEach(() => {
        render = (changedProps = {}) => mount(<Form />)
    })

    it('renders without crashing', () => {
        const component = render()
        expect(component.find(`.${cb}`).length).toEqual(1)
    })

    it('has correct type for input', () => {
        const component = render()
        expect(component.find('#nameEntry').prop('type')).toEqual('text')
    })

    it('sets value to state when input is typed in form', () => {
        const component = render()
        component.find('#nameEntry').simulate('change', {target: {value: 'Clem Fandango'}})
        expect(component.find('#nameEntry').prop('value')).toEqual('Clem Fandango')
    })

})