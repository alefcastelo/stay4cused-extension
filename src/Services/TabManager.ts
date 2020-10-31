import { tabs } from 'webextension-polyfill'
import { TabInterface } from '../Types'

class TabManager {
  async getTabById (id: number): Promise<TabInterface> {
    const result = await tabs.query({})
    const tab = result.find((tab) => tab.id === id)

    if (!tab) throw Error('Tab not found')

    return tab
  }

  async getTotal (): Promise<number> {
    const result = await tabs.query({})

    return result.length
  }

  async getCurrentTab (): Promise<TabInterface> {
    const result = await tabs.query({
      active: true,
      currentWindow: true
    })

    return result.shift()
  }

  async blockTabById (id: number): Promise<void> {
    tabs.update(id, {
      url: 'https://alefcastelo.com/',
      active: true
    })
  }

  async blockTabAndRemoveById (id: number): Promise<void> {
    await this.blockTabById(id)

    const removeTabAfter5Seconds = async (id: number) => {
      const tab = await this.getTabById(id)

      if (tab !== undefined) {
        this.removeTabById(id)
      }
    }

    window.setTimeout(removeTabAfter5Seconds, 5000, id)
  }

  async removeTabById (id: number): Promise<void> {
    tabs.remove(id)
  }
}

export default TabManager
