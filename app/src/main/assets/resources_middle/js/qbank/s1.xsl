<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:import href="s2.xsl"/>


<xsl:template match="LML">
	<div class="exam_Demo">
		<!--  지문s -->
		<div class="viva_sen">
			<xsl:for-each select="Sentence">
				<xsl:for-each select="*">
					<xsl:apply-templates select="." />
				</xsl:for-each>
			</xsl:for-each>
		</div>
		<!--  지문e -->

		<div class="viva_que_exp">
			<xsl:for-each select="Question">
			<!-- 문제 및 보기s-->
				<div class="viva_que">
				<xsl:if test="name(./*[1])='Paragraph'">
					<div class="queTxt">
						 <xsl:for-each select="Paragraph[1]/*">
							<xsl:call-template name="ParagraphOnly">
							</xsl:call-template>
						 </xsl:for-each>
					</div>
				</xsl:if>
				<xsl:if test="name(./*[1])='Table'">
					<div class="queTxt">
						 <xsl:for-each select="Table[1]/*">
							  <xsl:if test="position()=1">
							  <xsl:apply-templates select=".." />
							  </xsl:if>
						 </xsl:for-each>
					</div>
				</xsl:if>
				<xsl:for-each select="*">
					<xsl:if test="position()>1">
						 <xsl:apply-templates select="." />
					</xsl:if>
				</xsl:for-each>
				</div>
				<div class="Ex_box2" style='display:none;'>
				<xsl:for-each select="Explanation[1]/*">
					<xsl:if test="position()>0">
						 <xsl:apply-templates select="." />
					</xsl:if>
				</xsl:for-each>
				</div>
				<!-- 문제 및 보기e -->
			</xsl:for-each>
		</div>
	</div>
</xsl:template>

</xsl:stylesheet>