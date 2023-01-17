import React from 'react'
import { render } from 'react-dom'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col, Input, FormFeedback, FormText } from 'reactstrap'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

class CustomComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onSubmit = values => {
    this.props.input.onChange(values.nickname)
    this.toggle()
  }

  render = () => {
    let { input } = this.props

    return (
      <FormGroup row>
        <div className='input-group input-group-sm'>
          <Input {...input} readOnly />
          <div className='input-group-append'>
            <Button onClick={this.toggle}>
              Add Skill
            </Button>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader toggle={this.toggle}>Add skill</ModalHeader>
                <ModalBody>
                  <div>
                    <Field
                      name="nickname"
                      component="input"
                      type="text"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" disabled={submitting || pristine} color="primary">Submit</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </form>
            )}
          />
        </Modal>
      </FormGroup>
    )
  }
}

const App = () => (
  <Styles>
    <h1>🏁 React Final Form - Nested Forms Example</h1>
    <a href="https://github.com/erikras/react-final-form#-react-final-form">
      Read Docs
    </a>
    <Form
      onSubmit={onSubmit}
      initialValues={{ topics: 'none' }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Topics</label>
            <Field
              name="topics"
              component="input"
              type="text"
              placeholder="topics"
            />
          </div>
          <div>
            <label>Skills</label>
            <Field
              name="skills"
              component={CustomComponent}
            />
          </div>
          <div className="buttons">
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  </Styles>
)

render(<App />, document.getElementById("root"))
