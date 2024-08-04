# Generated Tree

<details>
<summary> Parameters </summary>

- Leaves: 5
- Branches: 2
- Order: Ascending (Reversed)
- Level Outlines: yes
- Table Representation: Horizontal (top-down)

```console
enary 5 2 -a -r -l -o examples/05x2:ascending:reversed:levels.md
```

</details>

<div align="center">

[Interactive View](https://mermaid.live/view#pako:eNpt0D1rwzAQBuC_Im4oCjgQ2fLnkKF07NZOrTqo8fkDZMnYViGE_PeiWjbUzvbee-ge0A0upkQooB5k35D3Z6EJGe33PNb8U8Ar_qAiXMCX2xEyTleFpGakapUqtNE495oxythhGU6UnZYhp_kSM5otMaXpX0Rd_lejVY22arhTE5ocyPF4dj55crBfxDT2i9z1ma855b5OH-LhiodbPNrhEY38scQZsa9DGvqaPzTYarCtwfffSpk_Fjkj9BchgA6HTrYlFHATMDXYoYBCQImVtGoScIcApJ3M21VfoJgGiwEMxtYNFJVUIwZg-1JO-NLKepDd2vZSfxjTzU_uv_CUn_o)

```mermaid
graph TB
  subgraph g4["Level 4"]
    style g1 fill:none
    n11(11)
    n10(10)
    n9(9)
    n8(8)
    n7(7)
  end
  subgraph g3["Level 3"]
    style g2 fill:none
    n6(6) --> n11 & n10
    n5(5) --> n9 & n8
    n4(4) --> n7
  end
  subgraph g2["Level 2"]
    style g3 fill:none
    n3(3) --> n6 & n5
    n2(2) --> n4
  end
  subgraph g1["Level 1"]
    style g4 fill:none
    n1(1) --> n3 & n2
  end
```

</div>
