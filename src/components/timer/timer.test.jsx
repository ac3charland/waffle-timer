import Timer, {cb} from './timer'

describe('Timer', () => {
    let render, props

    beforeEach(() => {
        props = {
            percentage: 42,
            timeRemaining: '4:44',
            name: 'Clem Fandango',
        }
        render = (changedProps = {}) => mount(<Timer {...props} {...changedProps} />)
    })

    it('renders without crashing', () => {
        const component = render()
        expect(component.find(`.${cb}`).length).toEqual(1)
    })

    it('displays time left for a given name', () => {
        const component = render()
        expect(component.find(`.${cb}__countdown-wrapper`).text()).toEqual('Time until Clem Fandango\'s waffle is ready:4:44')
    })

    it('shows when a person\'s waffle is done', () => {
        delete props.timeRemaining
        const component = render()
        expect(component.find(`.${cb}__countdown-wrapper`).text()).toEqual('Clem Fandango\'s waffle is done!')
    })

    it('shows a welcome message when no one has entered their name yet', () => {
        delete props.timeRemaining
        delete props.name
        const component = render()
        expect(component.find(`.${cb}__countdown-wrapper`).text()).toEqual('Enter your name below and be the first one to have a waffle!')
    })

    it('correctly calculates svg path', () => {
        const component = render()
        expect(component.find(`.${cb}__svg-wrapper svg`).prop('height')).toEqual(300)
        expect(component.find(`.${cb}__svg-wrapper svg`).prop('width')).toEqual(300)
        expect(component.find(`.${cb}__svg-wrapper path`).prop('d')).toEqual('M150,150 L150,5 A145,145 1 0,0 150,295 A145,145 1 0,0 219.85428274474867,277.06446860636026 z')
    })

    it('correctly calculates svg path with empty percentage', () => {
        delete props.percentage
        const component = render()
        expect(component.find(`.${cb}__svg-wrapper svg`).prop('height')).toEqual(300)
        expect(component.find(`.${cb}__svg-wrapper svg`).prop('width')).toEqual(300)
        expect(component.find(`.${cb}__svg-wrapper path`).prop('d')).toEqual('M150,150 L150,5 A145,145 1 0,0 150,5 z')
    })
})
