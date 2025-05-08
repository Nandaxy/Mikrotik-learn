---
title: What is Mikrotik?
difficulty: Beginner
difficultyEn: Beginner
duration: 30 minutes
prerequisites:
  - Basic computer networking knowledge
  - Basic understanding of IP Addressing
relatedMaterials:
  - title: Mikrotik Devices and RouterOS
    path: /en/materials/1/2
  - title: Advantages and Disadvantages of Mikrotik
    path: /en/materials/1/3
tableOfContents:
  - title: Introduction
    id: introduction
  - title: What is Mikrotik?
    id: what-is-mikrotik
  - title: History of Mikrotik
    id: history
  - title: Main Features
    id: features
  - title: Conclusion
    id: conclusion
references:
  - title: Official Mikrotik Documentation
    url: https://wiki.mikrotik.com/
  - title: MikroTik RouterOS Documentation
    url: https://help.mikrotik.com/docs/
  - title: ChatGPT
---

## Introduction {#introduction}

Welcome to the Mikrotik learning material! In this chapter, we will discuss the basics of Mikrotik, its history, and why Mikrotik has become a popular choice for networking solutions.

## What is Mikrotik? {#what-is-mikrotik}

Mikrotik is the name of a company located in Latvia that makes hardware and software for network connectivity. Their main product is RouterOS, a Linux-based operating system that turns a regular computer into a powerful network router.

![Mikrotik Logo](/placeholder.svg?height=200&width=400)

RouterOS can be installed on Mikrotik hardware (like RouterBoard) or on standard PCs, providing flexibility in implementation. Mikrotik offers various devices with different specifications to meet networking needs from small scale to enterprise.

## History of Mikrotik {#history}

Mikrotik was founded in 1996 by John Tully and Arnis Riekstins with the aim of developing routers and wireless ISP systems. In 1997, the company created RouterOS, a system that has now become the backbone of all Mikrotik products.

<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

Initially, Mikrotik focused on the wireless ISP market in developing countries, offering affordable yet powerful networking solutions. Over time, their products gained popularity worldwide due to the combination of competitive pricing and rich features.

## Main Features {#features}

RouterOS has various features for networking and connectivity management, including:

- **Firewall and NAT**: Network protection and Network Address Translation capabilities
- **Hotspot**: User authentication system for public internet access
- **Bandwidth Management**: Control bandwidth usage with Queue Tree and Simple Queue
- **Routing**: Supports static and dynamic routing protocols (OSPF, BGP, RIP)
- **VPN**: Supports various VPN protocols such as PPTP, L2TP, SSTP, and OpenVPN
- **Wireless**: Support for 802.11a/b/g/n/ac standards

Here's a basic configuration example for setting up an IP Address on an interface:

```
# Adding IP Address to ether1 interface
/ip address add address=192.168.1.1/24 interface=ether1

# Setting up default gateway
/ip route add dst-address=0.0.0.0/0 gateway=192.168.1.254
```

## Conclusion {#conclusion}

Mikrotik offers powerful and flexible networking solutions at an affordable price. By understanding the basics of Mikrotik, you have taken the first step to mastering this platform. In the next material, we will learn more about Mikrotik devices and RouterOS in detail.
