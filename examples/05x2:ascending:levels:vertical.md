# Generated Tree

<details>
<summary> Parameters </summary>

- Leaves: 5
- Branches: 2
- Order: Ascending
- Level Outlines: yes
- Table Representation: Vertical (right-left)

```console
enary 5 2 -a -l -t v -o examples/05x2:ascending:levels:vertical.md
```

</details>

<div align="center">

[Interactive View](https://mermaid.live/view#pako:eNptzT1vgzAQgOG_Yt1QORKRODCfQ6aOmdqtdQc3HB-SMQhMpSjKf68oDlIh291r-Z4bXLqCIIdqUH3Nzm_SMDZO38taiU8JZ_ohzYSEr_mNsdFeNbEKWdlonZvO0NJNwpODG1OePsaMZ48RfY7-uiBH_FvIFP_VcFXDrRrsVMHFgR2PJ2YS9sJM6nLEI5ezOaPvesxj1xGf4sGKB1s83OEBD9w1MSuRyyEPXY6fGrgauDXEzkCO7lgwG6G7CB60NLSqKSCHmwRbU0sScgkFlWrSVsIdPFCT7d6v5gK5HSbyYOimqoa8VHokD6a-UJZeG1UNql1rr8xH17XLl_svC3WgAg)

```mermaid
graph LR
  subgraph g4["Level 4"]
    style g1 fill:none
    n7(7)
    n8(8)
    n9(9)
    n10(10)
    n11(11)
  end
  subgraph g3["Level 3"]
    style g2 fill:none
    n4(4) --> n7 & n8
    n5(5) --> n9 & n10
    n6(6) --> n11
  end
  subgraph g2["Level 2"]
    style g3 fill:none
    n2(2) --> n4 & n5
    n3(3) --> n6
  end
  subgraph g1["Level 1"]
    style g4 fill:none
    n1(1) --> n2 & n3
  end
```

</div>
