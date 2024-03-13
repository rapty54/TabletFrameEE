<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes" encoding="utf-8" />
 
 
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
  
   <xsl:template match="Paragraph"> 
    <xsl:choose>
      <xsl:when test="name(..)='TableCell'">
        <div>  
          <xsl:if test="@TextAlignment!=''">
            <xsl:attribute name="class"><xsl:value-of select="@TextAlignment"/></xsl:attribute> 
          </xsl:if>
          <xsl:if test="not(contains(.,'mfrac'))">  
            <xsl:call-template name="TextIndent">
            </xsl:call-template> 
          </xsl:if>
          <xsl:if test="count(./TextBox)=0">           
            <xsl:for-each select="*">                   
              <xsl:call-template name="ParagraphOnly">
              </xsl:call-template>
            </xsl:for-each> 
          </xsl:if>       
        </div>
      </xsl:when>
      <xsl:otherwise>
        <div>  
          <xsl:if test="@TextAlignment!=''">
            <xsl:attribute name="class"><xsl:value-of select="@TextAlignment"/></xsl:attribute> 
          </xsl:if> 
          <xsl:call-template name="TextIndent">
          </xsl:call-template> 
          <xsl:choose>
            <xsl:when test="count(./*)=0 or substring(./Run/@FontSize,1,2)='2.'">
              <p style="margin-top:1em;"></p>
            </xsl:when>
            <xsl:when test="count(./TextBox)=0">
              <xsl:for-each select="*">      
                <xsl:call-template name="ParagraphOnly">
                </xsl:call-template>
              </xsl:for-each>   
            </xsl:when>
          </xsl:choose>
        </div>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template> 
  
   <xsl:template name="ParagraphOnly" match="*">  
    <xsl:choose>          
      <xsl:when test="name(.)='Run'">
        <xsl:choose> 
          <xsl:when test="@IsUnderLine='True' and @Text=' '">
            <span class="underline">&#160;</span>
          </xsl:when>
          <xsl:when test="@Text=' '">
            <span>&#160;</span>
          </xsl:when>
          <xsl:when test="@Text=''">
            <span>&#160;&#10;</span>                
          </xsl:when>
          <xsl:when test="@BorderThickness!='0,0,0,0'">
            <span style="border-top:{substring(@BorderThickness,1,1)}px solid #888;border-bottom:{substring(@BorderThickness,3,1)}px solid #888;border-left:{substring(@BorderThickness,5,1)}px solid #888;border-right:{substring(@BorderThickness,7,1)}px solid #888;font-size:{@FontSize}">
              <xsl:call-template name="string-replace-all">
                <xsl:with-param name="text" select="@Text"/>
                <xsl:with-param name="replace" select="'  '"/>
                <xsl:with-param name="by" select="'&#160; '"/>
              </xsl:call-template> 
            </span>
          </xsl:when>  
          <xsl:otherwise> 
            <span class="item_text">
            <xsl:for-each select=".">
              <xsl:if test="@IsUnderLine='True'">
                <xsl:attribute name="class">item_text underline</xsl:attribute>  
              </xsl:if>   
              <xsl:if test="@FontStyle='Italic'">
                <xsl:attribute name="class">item_text Italic</xsl:attribute>  
              </xsl:if> 
              <xsl:choose>   
                <xsl:when test="@FontWeight='Bold'">
                  <xsl:attribute name="style">font-weight:bold;font-family:'<xsl:value-of select="@FontFamily" />';font-size:<xsl:value-of select="@FontSize" />px;</xsl:attribute>  
                </xsl:when>  
                <xsl:otherwise> 
                  <xsl:attribute name="style">font-family:'<xsl:value-of select="@FontFamily" />';font-size:<xsl:value-of select="@FontSize" />px;</xsl:attribute>
                </xsl:otherwise> 
              </xsl:choose> 
              <xsl:choose>
                <xsl:when test="@BaselineAlignment='Subscript'">
                  <sub><xsl:value-of select="@Text" /></sub>
                </xsl:when> 
                <xsl:when test="@BaselineAlignment='Superscript'">
                  <sup><xsl:value-of select="@Text" /></sup>
                </xsl:when> 
                <xsl:otherwise> 
                  <xsl:call-template name="string-replace-all">
                    <xsl:with-param name="text" select="@Text"/>
                    <xsl:with-param name="replace" select="'  '"/>
                    <xsl:with-param name="by" select="'&#160; '"/>
                  </xsl:call-template>                  
                </xsl:otherwise> 
              </xsl:choose>                              
            </xsl:for-each>
            <xsl:if test="@IsUnderLine='True' and normalize-space(@Text)=''"> 
              <span>&#160;</span> 
            </xsl:if>              
            </span>
          </xsl:otherwise> 
        </xsl:choose>             
      </xsl:when>
      <xsl:when test="name(.)='LineBreak'">  
        <br/> 
      </xsl:when>      
      <xsl:when test="name(.)='Image'">
        <div class="Ex_img" >  
        <xsl:for-each select=".">     
          <xsl:choose>
            <xsl:when test="substring(@ContentHeight,1,1)=0">
             
               <img src="http://vivatem.visangesl.com/qpool/ITEM{@Uri}"  onclick="imageView('http://vivatem.visangesl.com/qpool/ITEM{@Uri}')" alt="">          
                <xsl:attribute name="style">width:<xsl:value-of select="@ContentWidth" />px;height:<xsl:value-of select="@ContentHeight" />px;</xsl:attribute>           
              </img>
            
            </xsl:when> 
            <xsl:otherwise>
              <xsl:choose>
                <xsl:when test="substring(@Uri,1,4)='http'"> 
              
                  <img src="{@Uri}"  onclick="imageView('{@Uri}')"  alt="">          
                    <xsl:attribute name="style">width:<xsl:value-of select="@ContentWidth" />px;max-width:100%;height:auto;</xsl:attribute>           
                  </img>                
               
                </xsl:when> 
                <xsl:otherwise>
              
                  <img src="http://vivatem.visangesl.com/qpool/ITEM{@Uri}" onclick="imageView('http://vivatem.visangesl.com/qpool/ITEM{@Uri}')" alt="">          
                    <xsl:attribute name="style">width:<xsl:value-of select="@ContentWidth" />px;max-width:100%;height:auto;</xsl:attribute>           
                  </img>
                
                </xsl:otherwise>
              </xsl:choose>
            </xsl:otherwise>
          </xsl:choose> 
        </xsl:for-each>             
        </div>
      </xsl:when>          
      <xsl:when test="name(.)='Math'">
        <xsl:for-each select=".">
          <xsl:choose>
            <xsl:when test="contains(.,'mfrac')">
              <span style="display:inline-block"><xsl:call-template name="string-replace-all">
                <xsl:with-param name="text" select="."/>
                <xsl:with-param name="replace" select="'&lt;math&gt;'"/>
                <xsl:with-param name="by" select="'&lt;math display=&#34;block&#34;&gt;'"/>
              </xsl:call-template></span>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="." disable-output-escaping="yes" />
            </xsl:otherwise> 
          </xsl:choose>              
        </xsl:for-each> 
      </xsl:when>   
      <xsl:when test="name(.)='Table'">
        <xsl:for-each select=".">
          <xsl:value-of select="." disable-output-escaping="yes" />
        </xsl:for-each> 
      </xsl:when>
      <xsl:when test="name(.)='Floater'">
        <xsl:for-each select="./Paragraph">
          <xsl:apply-templates select="." />  
        </xsl:for-each> 
      </xsl:when>
    </xsl:choose>    
  </xsl:template>    

  <xsl:template name="TextIndent" match="*"> 
    <xsl:choose>
      <xsl:when test="count(@TextIndent)>0 and count(@TextOutdent)>0">  
        <xsl:attribute name="style">margin-left:<xsl:value-of select="@TextOutdent"/>px;text-indent:-<xsl:value-of select="(@TextOutdent)-(@TextIndent)"/>px;</xsl:attribute>     
      </xsl:when>             
      <xsl:when test="count(@TextIndent)>0 and count(@TextOutdent)=0">  
        <xsl:attribute name="style">text-indent:<xsl:value-of select="@TextIndent"/>px</xsl:attribute>     
      </xsl:when>
      <xsl:when test="count(@TextIndent)=0 and count(@TextOutdent)>0">  
        <xsl:attribute name="style">margin-left:<xsl:value-of select="@TextOutdent"/>px;text-indent:-<xsl:value-of select="@TextOutdent"/>px;</xsl:attribute>     
      </xsl:when> 
    </xsl:choose> 
  </xsl:template>  
<xsl:template match="List">
    <p style="margin-top:0.5em;"></p>  
    <table class="exam_Table" cellpadding="0" cellspacing="0" style="width:100%;"> 
      <xsl:choose>
        <xsl:when test="@HorizonCount=2">         
          <tr> 
            <th>①</th> 
            <td>
                <xsl:for-each select="ListItem[1]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>    
            <th>②</th> 
            <td>
                <xsl:for-each select="ListItem[2]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td> 
          </tr>
          <tr>
            <th>③</th> 
            <td>
                <xsl:for-each select="ListItem[3]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>   
            <th>④</th> 
            <td>
                <xsl:for-each select="ListItem[4]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>  
          </tr>
          <tr>
            <th>⑤</th> 
            <td>
                <xsl:for-each select="ListItem[5]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>  
            <td></td>  
          </tr>          
      </xsl:when>      
      <xsl:when test="@HorizonCount=3">         
          <tr> 
            <th>①</th> 
            <td>
                <xsl:for-each select="ListItem[1]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>    
            <th>②</th> 
            <td>
                <xsl:for-each select="ListItem[2]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>   
            <th>③</th> 
            <td>
                <xsl:for-each select="ListItem[3]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>   
          </tr>
          <tr>
            <th>④</th> 
            <td>
                <xsl:for-each select="ListItem[4]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>                           
            <th>⑤</th> 
            <td>
                <xsl:for-each select="ListItem[5]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>  
            <td></td>  
          </tr>          
        </xsl:when>
        <xsl:when test="@HorizonCount=5">         
          <tr> 
            <th>①</th> 
            <td>
                <xsl:for-each select="ListItem[1]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>    
            <th>②</th> 
            <td>
                <xsl:for-each select="ListItem[2]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>  

            <th>③</th> 
            <td>
                <xsl:for-each select="ListItem[3]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>   
            <th>④</th> 
            <td>
                <xsl:for-each select="ListItem[4]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>                           
            <th>⑤</th> 
            <td>
                <xsl:for-each select="ListItem[5]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>   
          </tr>   
        </xsl:when>        
        <xsl:otherwise>
          <tr> 
            <th>①</th> 
            <td>
                <xsl:for-each select="ListItem[1]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>
          </tr>
          <tr>
            <th>②</th> 
            <td>
                <xsl:for-each select="ListItem[2]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td> 
          </tr>
          <tr>              
            <th>③</th> 
            <td>
                <xsl:for-each select="ListItem[3]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td> 
          </tr>
          <tr>              
            <th>④</th> 
            <td>
                <xsl:for-each select="ListItem[4]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>  
          </tr>
          <tr>                                     
            <th>⑤</th> 
            <td>
                <xsl:for-each select="ListItem[5]/Paragraph">
                  <xsl:apply-templates select="." />  
                </xsl:for-each>  
            </td>    
          </tr>                    
        </xsl:otherwise>
      </xsl:choose>         
    </table>     
  </xsl:template>

    <xsl:template match="Table"> 
    <xsl:if test="count(.//TextBox)=0">
    <div style="margin-top:5px">      
      <table cellpadding="0" cellspacing="0">  
        <xsl:if test="count(TableRow/TableCell)=1"> 
          <xsl:attribute name="width">335px</xsl:attribute> 
        </xsl:if>        
        <xsl:if test="contains(@Margin,',') and @Margin!='-1,-1,-1,-1'">
          <xsl:attribute name="style">margin:<xsl:call-template name="TableMargin" ><xsl:with-param name="numbers" select="@Margin" /></xsl:call-template>  
          </xsl:attribute>      
        </xsl:if>   
        <xsl:if test="contains(@ColumnInfo,',')">
          <colgroup>
            <xsl:call-template name="TableWidth" >
              <xsl:with-param name="numbers" select="@ColumnInfo" />
            </xsl:call-template>
          </colgroup>
        </xsl:if>                
        <tbody>
          <xsl:for-each select="TableRow">              
            <tr>
              <xsl:for-each select="TableCell">  
                <td rowspan="{@RowSpan}" colspan="{@ColumnSpan}"> 
                  <xsl:if test="@VerticalContentAlignment!=''">
                    <xsl:attribute name="valign"><xsl:value-of select="@VerticalContentAlignment"/></xsl:attribute> 
                  </xsl:if>                   
                  <xsl:if test="@Background!=''">
                    <xsl:attribute name="bgcolor">#<xsl:value-of select="substring(@Background,4,6)"/></xsl:attribute> 
                  </xsl:if>                 
                  <xsl:attribute name="style">
                    border-left:<xsl:value-of select="substring(@BorderThickness,1,1)"/>px solid #888;
                    border-top:<xsl:value-of select="substring(@BorderThickness,3,1)"/>px solid #888;
                    border-right:<xsl:value-of select="substring(@BorderThickness,5,1)"/>px solid #888;
                    border-bottom:<xsl:value-of select="substring(@BorderThickness,7,1)"/>px solid #888;
                    padding-left:<xsl:value-of select="substring(translate(@Padding,'-1','5'),1,1)"/>px;
                    padding-top:<xsl:value-of select="substring(translate(@Padding,'-1','5'),3,1)"/>px;
                    padding-right:<xsl:value-of select="substring(translate(@Padding,'-1','5'),5,1)"/>px;
                    padding-bottom:<xsl:value-of select="substring(translate(@Padding,'-1','5'),7,1)"/>px;
                  </xsl:attribute>                        
                  <xsl:for-each select="*">
                    <xsl:apply-templates select="." />
                  </xsl:for-each>                             
                </td>
              </xsl:for-each>             
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
    </xsl:if>
  </xsl:template> 

  <xsl:template name="TableWidth">
    <xsl:param name="numbers" />
    <xsl:variable name="number" select="substring-before($numbers, ',')" />
    <xsl:choose>
      <xsl:when test="$number">
        <col><xsl:attribute name="width"><xsl:value-of select="$number" />px</xsl:attribute></col>
        <xsl:call-template name="TableWidth">
          <xsl:with-param name="numbers" select="substring-after($numbers, ',')"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <col><xsl:attribute name="width"><xsl:value-of select="$numbers" />px</xsl:attribute></col>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="TableMargin">
    <xsl:param name="numbers" />
    <xsl:variable name="number" select="substring-before($numbers, ',')" />    
    <xsl:choose>
      <xsl:when test="$number">
        <xsl:value-of select="substring($number,1,3)" />px;<xsl:call-template name="TableMargin"><xsl:with-param name="numbers" select="substring-after($numbers, ',')"/></xsl:call-template>
      </xsl:when>
      <xsl:otherwise><xsl:value-of select="substring($numbers,1,3)" />px;</xsl:otherwise>
    </xsl:choose>
  </xsl:template>  

  <xsl:template name="string-replace-all">
   <xsl:param name="text"/>
   <xsl:param name="replace"/>
   <xsl:param name="by"/>
   <xsl:choose>
     <xsl:when test="contains($text,$replace)">
       <xsl:value-of select="substring-before($text,$replace)"/>
       <xsl:value-of select="$by"/>
       <xsl:call-template name="string-replace-all">
         <xsl:with-param name="text" select="substring-after($text,$replace)"/>
         <xsl:with-param name="replace" select="$replace"/>
         <xsl:with-param name="by" select="$by"/>
       </xsl:call-template>
     </xsl:when>
     <xsl:otherwise>
       <xsl:value-of select="$text" disable-output-escaping="yes"/>
     </xsl:otherwise>
   </xsl:choose>
   </xsl:template>

</xsl:stylesheet>