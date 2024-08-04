# Generated Tree

<details>
<summary> Parameters </summary>

- Leaves: 3
- Branches: 2
- Order: Descending
- Level Outlines: yes
- Table Representation: Horizontal (top-down)

```console
enary 3 2 -l -o examples/03x2:levels.md
```

</details>

<div align="center">

[Interactive View](https://mermaid.live/view#pako:eNptjTFvwyAQRv_K6YaKSM4A2BkYOkQduyVTSwcaztgSBsuGSlGU_16lppaadPt4J9674ClaQoVuMmMHx70OAHP-XJ6Ov2t8pS_ywDV-3G4Aczp7Aseh7b1XIQZaeOCMb8oUTPxOyeTPpGD_usXqFvdu8eCuWb2B7fYZAocnCKLghjUFy38bcm3I-4Z8aOzYrsjqW6MpRqxwoGkwvUWFF42po4E0Ko2WWpN90njFCk1O8XAOJ1RpylThFLPrULXGz1RhHq1J9NIbN5lhpaMJbzEOy5frNxiaeMQ)

```mermaid
graph TB
  subgraph g1["Level 1"]
    style g1 fill:none
    n1(1)
    n2(2)
    n3(3)
  end
  subgraph g2["Level 2"]
    style g2 fill:none
    n4(4) --> n1 & n2
    n5(5) --> n3
  end
  subgraph g3["Level 3"]
    style g3 fill:none
    n6(6) --> n4 & n5
  end
```

</div>
