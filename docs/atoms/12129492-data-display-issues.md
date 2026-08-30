# 数据与显示问题

> 来源：https://help.atoms.dev/zh/articles/12129492-data-display-issues
> 更新时间：2026年7月29日

排查 Atoms 中的数据可视化、图表渲染和字体显示问题。

## 修复数据分析中的中文字符显示问题

如果你正在使用 `matplotlib` 进行数据分析、图表绘制或图形生成，并发现中文字符显示为缺失的方块或框，请添加以下配置行以设置受支持的 CJK 字体：

python
import matplotlib.pyplot as plt

# Set supported Chinese font for matplotlib
plt.rcParams['font.sans-serif'] = ['WenQuanYi Zen Hei']
plt.rcParams['axes.unicode_minus'] = False  # Resolve minus sign display issue


请指示你的数据分析智能体 (`@David`) 在所有数据可视化脚本中包含此字体设置。

<AccordionGroup>
<Accordion title="为什么无法解析图片？">
要处理图片，你需要使用多模态模型，例如 Gemini-2.5-Pro Claude Sonnet 或 GPT5。
</Accordion>
</AccordionGroup>
