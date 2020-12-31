export default class Meetup {
  constructor() {
      
    /* include Linkedin icon style */
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>.linkedin-logo{color: var(--blue-70,#0073b1); height: 1.5rem!important; width: 1.5rem;} a.linkedin-link:visited{ opacity: 0.2; }</style>`,
    )

    this.registerObserver()

    if (this.validateUrl()) {
      this.processDom()
    }
  }

  validateUrl() {
    const is_valid_url =
      window.location.href.includes('/attendees') ||
      window.location.href.includes('/members')
    return is_valid_url
  }

  processDom() {
    let block_of_members = document.getElementsByClassName(
      'groupMembersList',
    )[0]
    let attendees = document.getElementsByClassName('attendees-list')[0]

    /* sanitize */
    if (!block_of_members && !attendees) return

    if (!block_of_members) block_of_members = attendees

    let list_of_members = block_of_members.getElementsByTagName('li') || []

    for (let i = 0; i < list_of_members.length; i++) {
      this.insertLinkedinLink(list_of_members[i])
    }
  }

  registerObserver() {
    let observer = new MutationObserver((mutations) => {
      /* sanitize */
      if (!this.validateUrl()) return

      for (let mutation of mutations) {
        for (let addedNode of mutation.addedNodes) {
          if (
            addedNode.nodeName == 'LI' &&
            addedNode.classList.contains('list-item')
          ) {
            this.insertLinkedinLink(addedNode)
          } else if (
            addedNode.nodeName == 'DIV' &&
            addedNode.childNodes.length >= 2
          ) {
            let list_of_members = addedNode.childNodes[0].childNodes[0]
            if (
              list_of_members &&
              typeof list_of_members.childNodes !== undefined &&
              typeof list_of_members.classList !== undefined &&
              list_of_members.classList.contains('list')
            ) {
              for (let i = 0; i < list_of_members.childNodes.length; i++) {
                this.insertLinkedinLink(list_of_members.childNodes[i])
              }
            }
          } else if (
            addedNode.nodeName == 'DIV' &&
            typeof addedNode.classList !== undefined &&
            addedNode.classList.contains('child-wrapper')
          ) {
            let list_of_members = addedNode.getElementsByClassName(
              'groupMembersList',
            )
            if (list_of_members) {
              list_of_members = list_of_members[0]
              for (let i = 0; i < list_of_members.childNodes.length; i++) {
                this.insertLinkedinLink(list_of_members.childNodes[i])
              }
            }
          }
        }
      }
    })
    observer.observe(document, { childList: true, subtree: true })
  }

  insertLinkedinLink(member_div) {
    let member_name = null
    let el_member_name = member_div.getElementsByTagName('h4')[0]

    if (el_member_name && el_member_name.innerText)
      member_name = el_member_name.innerText

    let member_items_menu = member_div.getElementsByClassName(
      'flex-item--shrink member-item-menu',
    )

    if (member_items_menu && member_name) {
      member_items_menu[0]
        .getElementsByTagName('ul')[0]
        .insertAdjacentHTML(
          'afterbegin',
          '<div class="flex-item flex-item--shrink valign--midddle">\
                  <a class="linkedin-link" href="https://www.linkedin.com/search/results/people/?keywords=' +
            member_name +
            '" title="Search ' +
            member_name +
            '\'s LinkedIn" target="_blank" onClick="this.style.opacity=0.2">\
                      <span class="padding--right-half text--secondary">\
                          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" class="linkedin-logo">\
                              <title>Search ' +
            member_name +
            '\'s LinkedIn</title>\
                                  <g>\
                                      <path d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1,2.77,3.52V29h5Z" fill="currentColor"></path>\
                                  </g> \
                          </svg>\
                      </span>\
                  </a>\
              </div>',
        )
    }
  }
}
