/* global describe it */
import sleep from 'sleep-promise'
import installJS from '../src/installJS'

const reactURL = '//unpkg.com/react@16.7.0/umd/react.production.min.js'
const jqueryURL = '//unpkg.com/jquery@3.3.1/dist/jquery.js'

/* eslint no-undef: 0 */

function loose<T> (value: T) {
  return value as any
}

describe('installJS', () => {
  describe('#installJS', () => {
    it('should install react properly.', async () => {
      const React = await installJS([reactURL])

      const t = typeof React.Component
      t.should.eq('function')
    })

    // it('should throw an error if URL is bad.', async () => {
    //   let error = null

    //   try {
    //     await installJS(['foobar'])
    //   } catch (err) {
    //     // console.log(err)
    //     error = err
    //   }

    //   error.should.not.be.eq(null)
    // })
  })

  describe('#JS cache', () => {
    it('should return cached value if js has been loaded.', async () => {
      const React = await installJS([reactURL])

      const t = typeof React.Component
      t.should.eq('function')

      const els = Array.prototype.filter.call(document.querySelectorAll('script'), (el: HTMLElement) => {
        return loose(el).src === 'http:' + reactURL
      })

      els.length.should.be.eq(1)
    })

    it('should return cached value if js is being loaded.', async () => {
      installJS([jqueryURL])
      installJS([jqueryURL])

      await sleep(500)

      const els = Array.prototype.filter.call(document.querySelectorAll('script'), (el: HTMLElement) => {
        return loose(el).src === 'http:' + jqueryURL
      })

      els.length.should.be.eq(1)
    })
  })
})
