from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib.styles import (
    getSampleStyleSheet,
    ParagraphStyle
)

from reportlab.lib.pagesizes import letter

from reportlab.lib import colors

from reportlab.platypus.flowables import HRFlowable

from reportlab.lib.enums import TA_CENTER

from datetime import datetime


def generate_pdf_report(data, filename):

    doc = SimpleDocTemplate(

        filename,

        pagesize=letter,

        rightMargin=40,

        leftMargin=40,

        topMargin=40,

        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    elements = []


    # ---------------------------------------------------
    # Custom Styles
    # ---------------------------------------------------

    title_style = ParagraphStyle(

        "TitleStyle",

        parent=styles["Title"],

        fontName="Helvetica-Bold",

        fontSize=28,

        leading=35,

        textColor=colors.HexColor("#06b6d4"),

        alignment=TA_CENTER,

        spaceAfter=20
    )


    section_style = ParagraphStyle(

        "SectionStyle",

        parent=styles["Heading2"],

        fontName="Helvetica-Bold",

        fontSize=20,

        leading=28,

        textColor=colors.HexColor("#38bdf8"),

        spaceAfter=15
    )


    body_style = ParagraphStyle(

        "BodyStyle",

        parent=styles["BodyText"],

        fontName="Helvetica",

        fontSize=12,

        leading=24,

        textColor=colors.HexColor("#1e293b")
    )


    footer_style = ParagraphStyle(

        "FooterStyle",

        parent=styles["Italic"],

        fontSize=10,

        alignment=TA_CENTER,

        textColor=colors.grey
    )


    # ---------------------------------------------------
    # Title
    # ---------------------------------------------------

    title = Paragraph(

        "Mitram AI Wellness Report",

        title_style
    )

    elements.append(title)

    subtitle = Paragraph(

        "<font color='#64748b'>AI Powered Mental Wellness Intelligence Platform</font>",

        styles["BodyText"]
    )

    elements.append(subtitle)

    elements.append(Spacer(1, 25))


    # ---------------------------------------------------
    # Wellness Status Banner
    # ---------------------------------------------------

    risk = data["risk"]

    if risk == "High":

        risk_color = "#ef4444"

        status_text = "High Emotional Stress Detected"

    elif risk == "Moderate":

        risk_color = "#facc15"

        status_text = "Moderate Wellness Imbalance"

    else:

        risk_color = "#22c55e"

        status_text = "Emotionally Stable"


    status_table = Table(

        [[status_text]],

        colWidths=[520]
    )

    status_table.setStyle(

        TableStyle([

            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor(risk_color)),

            ("TEXTCOLOR", (0, 0), (-1, -1), colors.white),

            ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),

            ("FONTSIZE", (0, 0), (-1, -1), 16),

            ("ALIGN", (0, 0), (-1, -1), "CENTER"),

            ("BOTTOMPADDING", (0, 0), (-1, -1), 14),

            ("TOPPADDING", (0, 0), (-1, -1), 14),

        ])
    )

    elements.append(status_table)

    elements.append(Spacer(1, 30))


    # ---------------------------------------------------
    # Assessment Summary
    # ---------------------------------------------------

    info_title = Paragraph(

        "Assessment Summary",

        section_style
    )

    elements.append(info_title)


    info = [

        ["User Email", data["user_email"]],

        ["Wellness Score", str(data["wellness_score"])],

        ["Risk Level", data["risk"]],

        [

            "Generated At",

            datetime.now().strftime("%d-%m-%Y %H:%M")
        ]

    ]


    table = Table(

        info,

        colWidths=[180, 340]
    )

    table.setStyle(

        TableStyle([

            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#0f172a")),

            ("TEXTCOLOR", (0, 0), (0, -1), colors.white),

            ("BACKGROUND", (1, 0), (1, -1), colors.HexColor("#e2e8f0")),

            ("TEXTCOLOR", (1, 0), (1, -1), colors.black),

            ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),

            ("FONTSIZE", (0, 0), (-1, -1), 12),

            ("GRID", (0, 0), (-1, -1), 1, colors.HexColor("#cbd5e1")),

            ("BOTTOMPADDING", (0, 0), (-1, -1), 14),

            ("TOPPADDING", (0, 0), (-1, -1), 14),

        ])
    )

    elements.append(table)

    elements.append(Spacer(1, 30))


    # ---------------------------------------------------
    # Divider
    # ---------------------------------------------------

    elements.append(

        HRFlowable(

            width="100%",

            thickness=1,

            color=colors.HexColor("#cbd5e1")
        )
    )

    elements.append(Spacer(1, 25))


    # ---------------------------------------------------
    # AI Insights
    # ---------------------------------------------------

    insight_title = Paragraph(

        "AI Wellness Insights",

        section_style
    )

    elements.append(insight_title)


    for item in data["insights"]:

        insight_box = Table(

            [[f"• {item}"]],

            colWidths=[520]
        )

        insight_box.setStyle(

            TableStyle([

                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#ecfeff")),

                ("TEXTCOLOR", (0, 0), (-1, -1), colors.HexColor("#0f172a")),

                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),

                ("FONTSIZE", (0, 0), (-1, -1), 12),

                ("BOX", (0, 0), (-1, -1), 1, colors.HexColor("#67e8f9")),

                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),

                ("TOPPADDING", (0, 0), (-1, -1), 12),

                ("LEFTPADDING", (0, 0), (-1, -1), 15),

            ])
        )

        elements.append(insight_box)

        elements.append(Spacer(1, 12))


    elements.append(Spacer(1, 20))


    # ---------------------------------------------------
    # Recommendations
    # ---------------------------------------------------

    recommendation_title = Paragraph(

        "Personalized Recommendations",

        section_style
    )

    elements.append(recommendation_title)


    recommendations = data.get("recommendations", [])


    if len(recommendations) == 0:

        no_data = Paragraph(

            "No recommendations available.",

            body_style
        )

        elements.append(no_data)

    else:

        for item in recommendations:

            recommendation_box = Table(

                [[f"✓ {item}"]],

                colWidths=[520]
            )

            recommendation_box.setStyle(

                TableStyle([

                    ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fefce8")),

                    ("TEXTCOLOR", (0, 0), (-1, -1), colors.HexColor("#1e293b")),

                    ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),

                    ("FONTSIZE", (0, 0), (-1, -1), 12),

                    ("BOX", (0, 0), (-1, -1), 1, colors.HexColor("#fde047")),

                    ("BOTTOMPADDING", (0, 0), (-1, -1), 12),

                    ("TOPPADDING", (0, 0), (-1, -1), 12),

                    ("LEFTPADDING", (0, 0), (-1, -1), 15),

                ])
            )

            elements.append(recommendation_box)

            elements.append(Spacer(1, 12))


    elements.append(Spacer(1, 30))


    # ---------------------------------------------------
    # User Profile
    # ---------------------------------------------------

    profile_title = Paragraph(

        "User Profile",

        section_style
    )

    elements.append(profile_title)

    profile_data = [

        ["Username", data.get("username", "User")],

        ["Email", data["user_email"]],

        ["Assessment Type", "AI Mental Wellness Assessment"]

    ]

    profile_table = Table(

        profile_data,

        colWidths=[180, 340]
    )

    profile_table.setStyle(

        TableStyle([

            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#082f49")),

            ("TEXTCOLOR", (0, 0), (0, -1), colors.white),

            ("BACKGROUND", (1, 0), (1, -1), colors.HexColor("#e0f2fe")),

            ("GRID", (0, 0), (-1, -1), 1, colors.HexColor("#7dd3fc")),

            ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),

            ("BOTTOMPADDING", (0, 0), (-1, -1), 12),

            ("TOPPADDING", (0, 0), (-1, -1), 12),

        ])
    )

    elements.append(profile_table)

    elements.append(Spacer(1, 30))


    # ---------------------------------------------------
    # Analytics Summary
    # ---------------------------------------------------

    analytics = data.get("analytics", {})

    analytics_title = Paragraph(

        "Analytics Summary",

        section_style
    )

    elements.append(analytics_title)

    analytics_data = [

        ["Average Wellness Score", str(analytics.get("average_score", 0))],

        ["Total Assessments", str(analytics.get("total_assessments", 0))],

        ["High Risk Cases", str(analytics.get("high_risk_count", 0))],

        ["Moderate Risk Cases", str(analytics.get("moderate_risk_count", 0))],

        ["Low Risk Cases", str(analytics.get("low_risk_count", 0))]

    ]

    analytics_table = Table(

        analytics_data,

        colWidths=[250, 270]
    )

    analytics_table.setStyle(

        TableStyle([

            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#0f172a")),

            ("TEXTCOLOR", (0, 0), (0, -1), colors.white),

            ("BACKGROUND", (1, 0), (1, -1), colors.HexColor("#f8fafc")),

            ("GRID", (0, 0), (-1, -1), 1, colors.HexColor("#cbd5e1")),

            ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),

            ("BOTTOMPADDING", (0, 0), (-1, -1), 12),

            ("TOPPADDING", (0, 0), (-1, -1), 12),

        ])
    )

    elements.append(analytics_table)

    elements.append(Spacer(1, 30))


    # ---------------------------------------------------
    # Wellness Timeline
    # ---------------------------------------------------

    history = data.get("history", [])

    timeline_title = Paragraph(

        "Wellness Timeline",

        section_style
    )

    elements.append(timeline_title)

    if len(history) > 0:

        timeline_data = [

            ["Assessment", "Score", "Risk", "Date"]

        ]

        for index, item in enumerate(history):

            timeline_data.append([

                f"Assessment {index+1}",

                str(item["wellness_score"]),

                item["risk"],

                item["created_at"]

            ])

        timeline_table = Table(

            timeline_data,

            colWidths=[130, 100, 120, 170]
        )

        timeline_table.setStyle(

            TableStyle([

                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0284c7")),

                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),

                ("GRID", (0, 0), (-1, -1), 1, colors.HexColor("#cbd5e1")),

                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),

                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#f8fafc")),

                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),

                ("TOPPADDING", (0, 0), (-1, -1), 10),

            ])
        )

        elements.append(timeline_table)

    else:

        no_history = Paragraph(

            "No wellness history available.",

            body_style
        )

        elements.append(no_history)

    elements.append(Spacer(1, 30))

    # ---------------------------------------------------
    # Executive AI Summary
    # ---------------------------------------------------

    summary_title = Paragraph(

        "Executive AI Summary",

        section_style
    )

    elements.append(summary_title)


    risk = data["risk"]

    score = data["wellness_score"]


    if risk == "High":

        summary_text = f"""

        The assessment indicates elevated emotional stress and psychological fatigue.
        The Emotional Wellness Index of {score} suggests significant burnout indicators,
        emotional imbalance, and potential mental exhaustion patterns.
        Immediate wellness intervention, stress reduction strategies,
        and emotional recovery practices are strongly recommended.

        """

    elif risk == "Moderate":

        summary_text = f"""

        The assessment indicates moderate emotional imbalance with manageable
        psychological stress indicators. The Emotional Wellness Index of {score}
        suggests early signs of emotional fatigue and wellness fluctuation.
        Preventive wellness management and emotional balance strategies are recommended.

        """

    else:

        summary_text = f"""

        The assessment indicates stable emotional wellness and balanced psychological
        health patterns. The Emotional Wellness Index of {score} reflects positive
        emotional stability, controlled stress levels, and healthy wellness indicators.
        Continued wellness maintenance practices are recommended.

        """


    summary_box = Table(

        [[summary_text]],

        colWidths=[520]
    )

    summary_box.setStyle(

        TableStyle([

            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f8fafc")),

            ("TEXTCOLOR", (0, 0), (-1, -1), colors.HexColor("#0f172a")),

            ("BOX", (0, 0), (-1, -1), 1, colors.HexColor("#cbd5e1")),

            ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),

            ("FONTSIZE", (0, 0), (-1, -1), 12),

            ("BOTTOMPADDING", (0, 0), (-1, -1), 18),

            ("TOPPADDING", (0, 0), (-1, -1), 18),

            ("LEFTPADDING", (0, 0), (-1, -1), 18),

            ("RIGHTPADDING", (0, 0), (-1, -1), 18),

        ])
    )

    elements.append(summary_box)

    elements.append(Spacer(1, 30))
    
    # ---------------------------------------------------
    # Footer
    # ---------------------------------------------------

    footer = Paragraph(

        "Generated by Mitram AI • Advanced Mental Wellness Intelligence Platform",

        footer_style
    )

    elements.append(footer)


    # ---------------------------------------------------
    # Build PDF
    # ---------------------------------------------------

    doc.build(elements)